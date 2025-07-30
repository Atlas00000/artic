// Test script for Cloudflare CDN setup
const assets = [
  'polar_bear.glb',
  'arctic_terrain1.glb', 
  'snowenvrion_1k.hdr'
];

const baseUrl = 'https://pub-fdb254222c8f4a71bed4b3dd7a1d8ba1.r2.dev';

async function testAsset(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return {
      url,
      status: response.status,
      ok: response.ok,
      size: response.headers.get('content-length'),
      type: response.headers.get('content-type')
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message
    };
  }
}

async function testAllAssets() {
  console.log('🧪 Testing Cloudflare CDN Assets...\n');
  
  for (const asset of assets) {
    const result = await testAsset(`${baseUrl}/${asset}`);
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${asset}`);
    console.log(`   URL: ${result.url}`);
    console.log(`   Status: ${result.status}`);
    if (result.ok) {
      console.log(`   Size: ${(result.size / 1024 / 1024).toFixed(2)}MB`);
      console.log(`   Type: ${result.type}`);
    } else {
      console.log(`   Error: ${result.error || 'Not found'}`);
    }
    console.log('');
  }
}

testAllAssets(); 