#!/usr/bin/env node

/**
 * Test script to verify video loading performance
 * Run this locally to test video loading before deploying to Vercel
 */

const fs = require('fs');
const path = require('path');

const videoFiles = [
  '/ForzaLionLoop-1-2.mp4',
  '/Final-Construction-Page-Banner-Video-1.mp4',
  '/Final-Industrial-Page-Banner-Video.mp4',
  '/ForzaTurbineLoop-Compressed.mp4',
  '/Final-Forza-Insulation-Header-Video_1.mp4',
  '/ForzaBoatLoop-Compressed.mp4',
  '/forzaTRuck2-Compressed.mp4'
];

const publicDir = path.join(__dirname, '..', 'public');

console.log('🔍 Testing video file availability...\n');

let allVideosExist = true;

videoFiles.forEach(videoPath => {
  const fullPath = path.join(publicDir, videoPath.replace('/', ''));
  
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`✅ ${videoPath} - ${sizeInMB}MB`);
  } else {
    console.log(`❌ ${videoPath} - MISSING`);
    allVideosExist = false;
  }
});

console.log('\n📊 Video Loading Recommendations:');
console.log('1. Ensure all video files are in the public directory');
console.log('2. Videos should be compressed for web (H.264, reasonable bitrate)');
console.log('3. Consider using WebM format for better compression');
console.log('4. Implement lazy loading for videos below the fold');
console.log('5. Use poster images as fallbacks');

if (allVideosExist) {
  console.log('\n🎉 All video files are present!');
  console.log('💡 Next steps:');
  console.log('   - Test video loading in browser');
  console.log('   - Check network tab for loading times');
  console.log('   - Verify fallback behavior on slow connections');
} else {
  console.log('\n⚠️  Some video files are missing!');
  console.log('   Please ensure all videos are in the public directory before deploying.');
  process.exit(1);
}
