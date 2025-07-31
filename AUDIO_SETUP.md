# Custom Audio Setup with Cloudflare CDN

This guide explains how to use custom audio files with your Arctic Region project using Cloudflare R2 storage.

## 🎵 Supported Audio Files

The system supports the following custom audio files:

- **`bear_growl.mp3`** - Bear growling sound (256KB)
- **`bear_roar.mp3`** - Bear roaring sound (512KB) 
- **`ambient_wind.mp3`** - Wind ambient sound (1.2MB)
- **`arctic_ambience.mp3`** - Arctic environment ambience (2.1MB)

## 📁 File Structure

```
public/assets/audio/
├── bear_growl.mp3
├── bear_roar.mp3
├── ambient_wind.mp3
└── arctic_ambience.mp3
```

## 🚀 Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_R2_URL=https://your-bucket.your-subdomain.r2.cloudflarestorage.com
CLOUDFLARE_CDN_DOMAIN=https://your-cdn-domain.com
```

### 2. Upload Audio Files

#### Option A: Using the Upload Script

```bash
# Upload a single audio file
node scripts/upload-audio.js path/to/your/audio.mp3

# Examples
node scripts/upload-audio.js public/assets/audio/bear_growl.mp3
node scripts/upload-audio.js public/assets/audio/arctic_ambience.mp3
```

#### Option B: Manual Upload via Cloudflare Dashboard

1. Go to Cloudflare Dashboard → R2 Object Storage
2. Navigate to your `arctic-assets` bucket
3. Create an `audio/` folder
4. Upload your audio files to the `audio/` folder

### 3. Audio File Requirements

- **Format**: MP3 (recommended) or WAV
- **Size**: Under 5MB per file
- **Quality**: 128-320 kbps for MP3
- **Duration**: 
  - Bear sounds: 1-3 seconds
  - Ambient sounds: 10-30 seconds (will loop)

## 🔧 How It Works

### Fallback System

The sound system uses a smart fallback approach:

1. **Custom Audio**: Tries to load from Cloudflare CDN
2. **Local Files**: Falls back to local files in `public/assets/audio/`
3. **Generated Sounds**: Creates programmatic sounds as final fallback

### Asset Loading

```typescript
// The system automatically tries to load custom audio
const buffer = await soundManager.loadCustomAudio('bearGrowl')

if (buffer) {
  // Play custom audio file
  soundManager.playCustomAudio(buffer, 'bear')
} else {
  // Fall back to generated sound
  soundManager.createGeneratedBearSound()
}
```

## 🎛️ Customization

### Adding New Audio Types

1. **Update CDN Configuration** (`utils/cloudflare-cdn.ts`):

```typescript
export const CDN_ASSETS = {
  // ... existing assets
  newSound: {
    localPath: '/assets/audio/new_sound.mp3',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/audio/new_sound.mp3`,
    fallbackPath: '/assets/audio/new_sound.mp3',
    size: '512KB',
    type: 'audio'
  }
}
```

2. **Update Sound Manager** (`utils/soundManager.ts`):

```typescript
private async loadCustomAudio(assetKey: 'bearGrowl' | 'bearRoar' | 'newSound'): Promise<AudioBuffer | null> {
  // ... existing code
}
```

### Volume Control

Adjust volume levels in `playCustomAudio()`:

```typescript
const volume = type === 'ambient' ? 0.3 : 0.5  // 0.0 to 1.0
```

## 🐛 Troubleshooting

### Common Issues

1. **Audio not playing**: Check browser console for CORS errors
2. **File not found**: Verify file exists in Cloudflare R2 bucket
3. **Permission denied**: Check API token permissions
4. **Large file size**: Compress audio files to under 5MB

### Debug Commands

```bash
# Check asset health
npm run check-assets

# Test audio loading
npm run test-audio

# Preload all assets
npm run preload-assets
```

## 📊 Performance Benefits

- **CDN Delivery**: Global edge caching for fast loading
- **Compression**: Automatic compression and optimization
- **Fallback**: Graceful degradation if CDN fails
- **Caching**: Browser caching for repeated plays

## 🔒 Security

- Audio files are served via HTTPS
- CORS headers configured for web access
- API tokens have minimal required permissions
- Files are publicly accessible but can be restricted if needed

## 📝 Notes

- Audio files are cached aggressively (1 year TTL)
- Generated sounds are used as fallback for reliability
- All audio operations are wrapped in try-catch blocks
- Console warnings help debug loading issues

For more information, see the main README.md file. 