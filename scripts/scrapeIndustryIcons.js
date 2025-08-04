const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Industry icons to scrape from WordPress
const industryIcons = [
  {
    name: 'Transportation-Icon-2.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/09/Transportation-Icon-2.png'
  },
  {
    name: 'Marine-Icon.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/09/Marine-Icon.png'
  },
  {
    name: 'Construction-Icon.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/09/Construction-Icon.png'
  },
  {
    name: 'Industrial-Icon.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/09/Industrial-Icon.png'
  },
  {
    name: 'Composite-Icon.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/09/Composite-Icon.png'
  },
  {
    name: 'Insulation-Icon.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/09/Insulation-Icon.png'
  },
  {
    name: 'Foam-Icon.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/09/Foam-Icon.png'
  }
];

// Create public/logos directory if it doesn't exist
const logosDir = path.join(__dirname, '..', 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Function to download a file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Main function to download all icons
async function downloadAllIcons() {
  console.log('🚀 Starting to download industry icons...\n');
  
  const downloadPromises = industryIcons.map(async (icon) => {
    const filepath = path.join(logosDir, icon.name);
    
    try {
      await downloadFile(icon.url, filepath);
    } catch (error) {
      console.error(`❌ Failed to download ${icon.name}:`, error.message);
    }
  });
  
  await Promise.all(downloadPromises);
  
  console.log('\n✨ Download complete!');
  console.log(`📁 Icons saved to: ${logosDir}`);
  
  // List downloaded files
  const files = fs.readdirSync(logosDir);
  console.log('\n📋 Downloaded files:');
  files.forEach(file => {
    const stats = fs.statSync(path.join(logosDir, file));
    console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
}

// Run the script
downloadAllIcons().catch(console.error); 