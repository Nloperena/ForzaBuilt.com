const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create the main directory for X-ray assets
const baseDir = path.join(__dirname, '..', 'xray-assets');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Industry data mapping
const industries = {
  marine: {
    name: 'Marine',
    assets: [
      {
        id: 'marine-xray-1',
        name: 'Marine Boat',
        preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/6ouZLSgoHcLk2OWbaLla5o/5a0b49f23638ef42ae95237477fa2ad3/Marine_Boat.png',
        postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/5pUlDcvSsLIMeyC4HXQaK1/5acbb21568d484ffa5aa00506d499613/Marine_Exploded_Boat_Graphic.png',
        svgOverlay: '/img/marine/marine-overlay.svg',
        width: 259.2,
        height: 259.2
      },
      {
        id: 'marine-xray-2',
        name: 'Marine Pontoon',
        preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/6HWrpaU0ZzK2cBIqSHXXZS/1daedcc2cdfb0d366c5a8db29b592dcf/Pontoon_Boat__1_.png',
        postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/4pfvji0pqdNa39baRHeeDc/ecaa4157a51a62008a83f270467cbea1/Pontoon_Boat_Exploded_Graphic__1_.jpg',
        svgOverlay: '/img/marine/Marine Pontoon2 SVG.svg',
        width: 233.403,
        height: 191.162
      }
    ]
  },
  construction: {
    name: 'Construction',
    assets: [
      {
        id: 'construction-commercial-xray',
        name: 'Construction Commercial',
        preSrc: '/img/construction/Construction Commercial Exterior Graphic (1).png',
        postSrc: '/img/construction/Construction Commercial PostXray.png',
        svgOverlay: '/img/construction/Construction Commercial Exploded Graphic Web.svg',
        width: 2592,
        height: 2592
      },
      {
        id: 'construction-house-xray',
        name: 'Construction House',
        preSrc: '/img/construction/Construction House Exterior Graphic Web.png',
        postSrc: '/img/construction/Construction House PostXray.png',
        svgOverlay: '/img/construction/Construction House Exploded Graphic Web.svg',
        width: 259.2,
        height: 259.2
      }
    ]
  },
  industrial: {
    name: 'Industrial',
    assets: [
      {
        id: 'industrial-manufacturing-xray',
        name: 'Industrial Manufacturing',
        preSrc: '/img/industrial/Industrial-Manufacturing-Pre.png',
        postSrc: '/img/industrial/Industrial-Manufacturing-Post.png',
        svgOverlay: '/img/industrial/Industrial-Manufacturing-Overlay.svg',
        width: 2592,
        height: 2592
      }
    ]
  },
  composites: {
    name: 'Composites',
    assets: [
      {
        id: 'composites-xray-1',
        name: 'Composites Wind Turbine',
        preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/1lj8BtWRbtlZndHQr1wnR4/a4b1ea878ec216db4be3512917237060/Composites_Wind_Turbine.png',
        postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/5hKcPnDQaYkJNKVCUH30Jf/67fe0255a7c7e059391362624d6e9065/Wind_Turbine_Exploded_Graphic_Web.png',
        svgOverlay: '/img/composites/composite-overlay-turbine.svg',
        width: 4368,
        height: 2912
      }
    ]
  },
  insulation: {
    name: 'Insulation',
    assets: [
      {
        id: 'insulation-xray-1',
        name: 'Insulation House',
        preSrc: '/img/insulation/House Exterior.png',
        postSrc: '/img/insulation/Final House Exploded Graphic.png',
        svgOverlay: '/img/insulation/Final House Exploded Graphic.svg',
        width: 1080,
        height: 1080
      },
      {
        id: 'insulation-xray-2',
        name: 'Insulation Pipe',
        preSrc: '/img/insulation/Pipe completely wrapped.png',
        postSrc: '/img/insulation/Pipe Exploded Graphic.png',
        svgOverlay: '/img/insulation/Pipe Exploded Graphic.svg',
        width: 1080,
        height: 1080
      }
    ]
  },
  transportation: {
    name: 'Transportation',
    assets: [
      {
        id: 'transportation-rv-bus-xray',
        name: 'Transportation RV Bus',
        preSrc: '/img/transportation/RV Bus PreX-Ray.png',
        postSrc: '/img/transportation/RV Bus PostX-Ray.jpg',
        svgOverlay: '/img/transportation/RV Bus Exploded.svg',
        width: 259.2,
        height: 259.2
      },
      {
        id: 'transportation-trailer-xray',
        name: 'Transportation Trailer',
        preSrc: '/img/transportation/Trailer PreX-Ray.png',
        postSrc: '/img/transportation/Trailer PostX-Ray.jpg',
        svgOverlay: '/img/transportation/Trailer Exploded Graphic.svg',
        width: 800,
        height: 600
      }
    ]
  }
};

// Function to download a file
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${path.basename(filePath)}`);
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filePath, () => {}); // Delete the file on error
          reject(err);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to copy local files
function copyLocalFile(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    const fullSrcPath = path.join(__dirname, '..', 'public', srcPath);
    
    if (fs.existsSync(fullSrcPath)) {
      fs.copyFile(fullSrcPath, destPath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`✅ Copied: ${path.basename(destPath)}`);
          resolve();
        }
      });
    } else {
      console.log(`⚠️  Local file not found: ${fullSrcPath}`);
      resolve(); // Don't fail the whole process for missing local files
    }
  });
}

// Main download function
async function downloadAllAssets() {
  console.log('🚀 Starting X-ray assets download...\n');
  
  for (const [industryKey, industry] of Object.entries(industries)) {
    console.log(`📁 Processing ${industry.name} industry...`);
    
    // Create industry directory
    const industryDir = path.join(baseDir, industryKey);
    if (!fs.existsSync(industryDir)) {
      fs.mkdirSync(industryDir, { recursive: true });
    }
    
    for (const asset of industry.assets) {
      console.log(`  📦 Processing ${asset.name}...`);
      
      // Create asset subdirectory
      const assetDir = path.join(industryDir, asset.id);
      if (!fs.existsSync(assetDir)) {
        fs.mkdirSync(assetDir, { recursive: true });
      }
      
      // Download pre-image
      if (asset.preSrc.startsWith('http')) {
        const preFileName = `pre-${path.basename(asset.preSrc)}`;
        const prePath = path.join(assetDir, preFileName);
        try {
          await downloadFile(asset.preSrc, prePath);
        } catch (err) {
          console.log(`❌ Failed to download pre-image: ${err.message}`);
        }
      } else {
        const preFileName = `pre-${path.basename(asset.preSrc)}`;
        const prePath = path.join(assetDir, preFileName);
        await copyLocalFile(asset.preSrc, prePath);
      }
      
      // Download post-image
      if (asset.postSrc.startsWith('http')) {
        const postFileName = `post-${path.basename(asset.postSrc)}`;
        const postPath = path.join(assetDir, postFileName);
        try {
          await downloadFile(asset.postSrc, postPath);
        } catch (err) {
          console.log(`❌ Failed to download post-image: ${err.message}`);
        }
      } else {
        const postFileName = `post-${path.basename(asset.postSrc)}`;
        const postPath = path.join(assetDir, postFileName);
        await copyLocalFile(asset.postSrc, postPath);
      }
      
      // Copy SVG overlay
      if (asset.svgOverlay) {
        const svgFileName = `overlay-${path.basename(asset.svgOverlay)}`;
        const svgPath = path.join(assetDir, svgFileName);
        await copyLocalFile(asset.svgOverlay, svgPath);
      }
      
      // Create metadata file
      const metadata = {
        id: asset.id,
        name: asset.name,
        industry: industry.name,
        dimensions: {
          width: asset.width,
          height: asset.height
        },
        files: {
          preImage: asset.preSrc.startsWith('http') ? `pre-${path.basename(asset.preSrc)}` : `pre-${path.basename(asset.preSrc)}`,
          postImage: asset.postSrc.startsWith('http') ? `post-${path.basename(asset.postSrc)}` : `post-${path.basename(asset.postSrc)}`,
          svgOverlay: asset.svgOverlay ? `overlay-${path.basename(asset.svgOverlay)}` : null
        },
        originalUrls: {
          preSrc: asset.preSrc,
          postSrc: asset.postSrc,
          svgOverlay: asset.svgOverlay
        }
      };
      
      const metadataPath = path.join(assetDir, 'metadata.json');
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
      console.log(`  📄 Created metadata.json`);
    }
    
    console.log(`✅ Completed ${industry.name} industry\n`);
  }
  
  // Create master index
  const masterIndex = {
    generated: new Date().toISOString(),
    totalIndustries: Object.keys(industries).length,
    totalAssets: Object.values(industries).reduce((sum, industry) => sum + industry.assets.length, 0),
    industries: Object.keys(industries).map(key => ({
      key,
      name: industries[key].name,
      assetCount: industries[key].assets.length,
      assets: industries[key].assets.map(asset => ({
        id: asset.id,
        name: asset.name,
        path: `${key}/${asset.id}/`
      }))
    }))
  };
  
  const indexPath = path.join(baseDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(masterIndex, null, 2));
  
  console.log('🎉 All X-ray assets downloaded and organized!');
  console.log(`📁 Assets saved to: ${baseDir}`);
  console.log(`📄 Master index: ${indexPath}`);
  console.log('\n📋 Directory structure:');
  console.log('xray-assets/');
  console.log('├── index.json (master index)');
  Object.keys(industries).forEach(key => {
    console.log(`├── ${key}/ (${industries[key].name})`);
    industries[key].assets.forEach(asset => {
      console.log(`│   └── ${asset.id}/`);
      console.log(`│       ├── pre-*.png (original image)`);
      console.log(`│       ├── post-*.png (X-ray image)`);
      console.log(`│       ├── overlay-*.svg (SVG overlay)`);
      console.log(`│       └── metadata.json (asset info)`);
    });
  });
}

// Run the download
downloadAllAssets().catch(console.error);



