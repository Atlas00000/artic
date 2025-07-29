# Railway Deployment for Arctic Region

## Quick Deploy

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Link to Railway Project**
   ```bash
   railway link
   ```

4. **Deploy**
   ```bash
   railway up
   ```

## Environment Variables

Set these in Railway dashboard:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

## Railway Advantages

- ✅ **No 3D asset limits** (unlike Vercel)
- ✅ **Better performance** for large files
- ✅ **Custom domains** support
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Free tier** with generous limits

## Deployment Commands

```bash
# Deploy to Railway
railway up

# View logs
railway logs

# Open in browser
railway open

# Check status
railway status
```

## Troubleshooting

### Build Issues
```bash
# Clear Railway cache
railway logout
railway login
railway up
```

### Asset Loading
- 3D assets are included in git
- Railway serves them from `/public/assets/`
- No CDN restrictions

### Performance
- Railway has better 3D asset handling
- No function timeout limits
- Optimized for large files
