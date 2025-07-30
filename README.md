# 🐻‍❄️ Arctic Life - 3D Polar Wildlife Explorer

An interactive educational platform featuring 3D polar animals with Cloudflare CDN integration for optimal performance.

## ✨ Features

- **3D Polar Bear Model** with realistic animations
- **Arctic Terrain** with custom snow environment
- **Interactive Data Panels** with educational content
- **Cloudflare CDN** for fast 3D asset delivery
- **Responsive Design** for mobile and desktop
- **Arctic-themed UI** with animated effects
- **Asset Health Monitoring** with fallback support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Cloudflare account (for CDN)

### Installation

```bash
# Clone the repository
git clone https://github.com/Atlas00000/artic.git
cd arctic_region

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Cloudflare credentials

# Start development server
pnpm dev
```

## ☁️ Cloudflare CDN Setup

### 1. Create Cloudflare Account
- Sign up at [cloudflare.com](https://cloudflare.com)
- Get your Account ID from the dashboard

### 2. Set Up R2 Storage
```bash
# Create R2 bucket for 3D assets
# Upload your GLB/HDR files to R2
# Note the bucket URL and custom domain
```

### 3. Configure Environment Variables
```bash
# .env.local
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ZONE_ID=your_zone_id
CLOUDFLARE_R2_URL=https://your-bucket.r2.cloudflarestorage.com
CLOUDFLARE_CDN_DOMAIN=https://your-cdn-domain.com
```

### 4. Upload 3D Assets
```bash
# Assets to upload to Cloudflare R2:
# - arctic_terrain1.glb (2.1MB)
# - polar_bear.glb (1.8MB) 
# - snowenvrion_1k.hdr (3.2MB)
```

## 🏗️ Project Structure

```
arctic_region/
├── app/                    # Next.js app directory
│   ├── api/cdn/           # CDN proxy API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main Arctic Life page
├── components/
│   ├── scene/             # 3D scene components
│   ├── ui/                # UI components
│   └── gltf-model.tsx     # 3D model loader
├── utils/
│   ├── cloudflare-cdn.ts  # CDN utilities
│   └── assetLoader.ts     # Asset loading logic
├── data/
│   └── polar-bear-data.ts # Animal information
└── public/assets/         # Local 3D assets (fallback)
```

## 🔧 Configuration

### Vercel Deployment
- Automatic deployment from GitHub
- Optimized for 3D assets
- Cloudflare CDN integration
- Edge caching enabled

### Asset Loading Strategy
1. **Development**: Local assets
2. **Production**: Cloudflare CDN → Local fallback
3. **Health Checks**: Automatic asset validation
4. **Retry Logic**: 3 attempts with exponential backoff

## 📊 Performance Features

- **CDN Optimization**: Global edge caching
- **Asset Compression**: Automatic optimization
- **Lazy Loading**: Progressive asset loading
- **Health Monitoring**: Real-time asset status
- **Fallback Support**: Graceful degradation

## 🎨 Customization

### Adding New Animals
1. Add 3D model to `public/assets/`
2. Update `utils/cloudflare-cdn.ts`
3. Create data file in `data/`
4. Update UI components

### Styling
- Arctic theme with Tailwind CSS
- Custom animations in `styles/globals.css`
- Responsive design patterns

## 🐛 Troubleshooting

### Asset Loading Issues
```bash
# Check asset health
curl -I https://your-cdn-domain.com/polar_bear.glb

# Verify environment variables
echo $CLOUDFLARE_CDN_DOMAIN
```

### Development Issues
```bash
# Clear cache
pnpm clean

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📈 Monitoring

### Asset Health Dashboard
- Real-time CDN status
- Load time metrics
- Error tracking
- Fallback usage stats

### Performance Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Three.js for 3D rendering
- React Three Fiber for React integration
- Cloudflare for CDN services
- Vercel for hosting platform

---

**Built with ❄️ for educational exploration of Arctic wildlife** 