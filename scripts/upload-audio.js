#!/usr/bin/env node

/**
 * Script to upload audio files to Cloudflare R2
 * Usage: node scripts/upload-audio.js <audio-file-path>
 */

const fs = require('fs');
const path = require('path');

// Cloudflare R2 Configuration
const CLOUDFLARE_CONFIG = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
  bucketName: 'arctic-assets',
  r2Url: process.env.CLOUDFLARE_R2_URL
};

async function uploadAudioFile(filePath) {
  if (!CLOUDFLARE_CONFIG.accountId || !CLOUDFLARE_CONFIG.apiToken) {
    console.error('❌ Missing Cloudflare credentials. Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN');
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  
  try {
    const response = await fetch(`${CLOUDFLARE_CONFIG.r2Url}/audio/${fileName}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_CONFIG.apiToken}`,
        'Content-Type': 'audio/mpeg',
        'x-amz-meta-cache-control': 'public, max-age=31536000'
      },
      body: fileBuffer
    });

    if (response.ok) {
      console.log(`✅ Successfully uploaded: ${fileName}`);
      console.log(`📁 CDN URL: ${CLOUDFLARE_CONFIG.r2Url}/audio/${fileName}`);
    } else {
      console.error(`❌ Upload failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Upload error:', error.message);
  }
}

// Main execution
const audioFile = process.argv[2];

if (!audioFile) {
  console.log('📝 Usage: node scripts/upload-audio.js <audio-file-path>');
  console.log('');
  console.log('🎵 Example audio files to upload:');
  console.log('  - bear_growl.mp3');
  console.log('  - bear_roar.mp3');
  console.log('  - ambient_wind.mp3');
  console.log('  - arctic_ambience.mp3');
  console.log('');
  console.log('💡 Make sure your audio files are:');
  console.log('  - MP3 format (recommended)');
  console.log('  - Under 5MB each');
  console.log('  - Named according to the asset keys in cloudflare-cdn.ts');
  process.exit(1);
}

uploadAudioFile(audioFile); 