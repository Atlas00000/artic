#!/usr/bin/env node

/**
 * Test script to verify audio files are accessible from Cloudflare CDN
 */

// Mock environment variables for testing
process.env.NODE_ENV = 'production';

// Simple test function
async function testAudioFiles() {
  console.log('🎵 Testing Audio File URLs...\n');
  
  const audioFiles = [
    'bear_growl.mp3',
    'bear_roar.mp3', 
    'ambient_wind.mp3',
    'arctic_ambience.mp3'
  ];
  
  // Get CDN domain from environment or use a placeholder
  const cdnDomain = process.env.CLOUDFLARE_CDN_DOMAIN || process.env.CLOUDFLARE_R2_URL || 'https://your-cdn-domain.com';
  
  for (const fileName of audioFiles) {
    try {
      console.log(`📁 Testing ${fileName}...`);
      
      const url = `${cdnDomain}/audio/${fileName}`;
      console.log(`🔗 URL: ${url}`);
      
      // Try to fetch the file
      const response = await fetch(url, { method: 'HEAD' });
      
      if (response.ok) {
        console.log(`✅ ${fileName}: Accessible (HTTP ${response.status})`);
      } else {
        console.log(`❌ ${fileName}: HTTP ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ ${fileName}: Error - ${error.message}`);
    }
    console.log('');
  }
  
  console.log('🎧 Audio test complete!');
  console.log('\n💡 If you see errors, make sure:');
  console.log('   1. Your environment variables are set correctly');
  console.log('   2. The audio files are uploaded to Cloudflare R2');
  console.log('   3. The CDN domain is configured properly');
}

// Run the test
testAudioFiles().catch(console.error); 