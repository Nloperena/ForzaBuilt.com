#!/usr/bin/env node
/**
 * Download mainImage (and any additional images if desired) for every product
 * in src/data/productsMerged.json.
 * Images are saved to   public/product-images/<slug>.ext
 * The merged JSON is updated in-place so `mainImage` now contains the local
 * relative path the frontend can reference (e.g. "/product-images/abc.png").
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http  = require('http');

const root     = path.join(__dirname, '..');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');
const imgDir     = path.join(root, 'public', 'product-images');

if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, {recursive:true});

function download(url, dest){
  const proto = url.startsWith('https') ? https : http;
  return new Promise((resolve,reject)=>{
    proto.get(url, res=>{
      if(res.statusCode>=300 && res.statusCode<400 && res.headers.location){
        // handle redirect
        return download(res.headers.location,dest).then(resolve).catch(reject);
      }
      if(res.statusCode!==200){
        return reject(new Error('HTTP '+res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', ()=>file.close(resolve));
      file.on('error', err=>{fs.unlink(dest,()=>{}); reject(err);});
    }).on('error',reject);
  });
}

function slugify(filename){
  return filename.toLowerCase().replace(/[^a-z0-9.-]+/g,'-');
}

(async()=>{
  const products = JSON.parse(fs.readFileSync(mergedPath,'utf8'));

  for(const p of products){
    if(!p.mainImage) continue;
    try{
      const url = p.mainImage.trim();
      const extMatch = path.extname(url).match(/\.[a-z0-9]+(\?|$)/i);
      const ext = extMatch ? extMatch[0].split('?')[0] : '.png';
      const fileName = slugify(p.id)+ext;
      const localRel = '/product-images/'+fileName;
      const localPath = path.join(imgDir,fileName);
      if(!fs.existsSync(localPath)){
        console.log('⬇️  ', fileName);
        await download(url, localPath);
      }
      p.mainImage = localRel;
    }catch(err){
      console.warn('⚠️  failed', p.id, err.message);
    }
  }

  fs.writeFileSync(mergedPath, JSON.stringify(products,null,2));
  console.log('✔ images downloaded & productsMerged.json updated');
})();