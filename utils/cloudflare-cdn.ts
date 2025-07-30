export interface CloudflareAsset {
  id: string
  name: string
  url: string
  size: number
  uploaded: string
}

export interface CDNConfig {
  accountId: string
  apiToken: string
  r2Url: string
}

// Cloudflare R2 Storage Configuration
export const CLOUDFLARE_CONFIG = {
  // Replace with your Cloudflare account details
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
  apiToken: process.env.CLOUDFLARE_API_TOKEN || '',
  r2Url: process.env.CLOUDFLARE_R2_URL || '',
  
  // R2 Bucket Configuration
  bucketName: 'arctic-assets',
  
  // CDN Configuration
  cdnDomain: process.env.CLOUDFLARE_CDN_DOMAIN || process.env.CLOUDFLARE_R2_URL || '',
  cacheTTL: 31536000, // 1 year in seconds
}

// Asset mapping for Cloudflare R2
export const CDN_ASSETS = {
  arcticTerrain: {
    localPath: '/assets/arctic_terrain1.glb',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/arctic_terrain1.glb`,
    fallbackPath: '/assets/arctic_terrain1.glb',
    size: '2.1MB',
    type: 'model'
  },
  polarBear: {
    localPath: '/assets/polar_bear.glb',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/polar_bear.glb`,
    fallbackPath: '/assets/polar_bear.glb',
    size: '1.8MB',
    type: 'model'
  },
  snowEnvironment: {
    localPath: '/assets/snowenvrion_1k.hdr',
    cdnPath: `${CLOUDFLARE_CONFIG.cdnDomain}/snowenvrion_1k.hdr`,
    fallbackPath: '/assets/snowenvrion_1k.hdr',
    size: '3.2MB',
    type: 'environment'
  }
}

// Get optimized asset URL with fallback
export const getCDNAssetUrl = (assetKey: keyof typeof CDN_ASSETS): string => {
  const asset = CDN_ASSETS[assetKey]
  
  // In development, use local assets
  if (process.env.NODE_ENV === 'development') {
    return asset.localPath
  }
  
  // In production, prefer R2 CDN with fallback
  if (CLOUDFLARE_CONFIG.cdnDomain) {
    return asset.cdnPath
  }
  
  return asset.fallbackPath
}

// Asset loading with retry logic
export const loadAssetWithRetry = async (
  assetKey: keyof typeof CDN_ASSETS,
  maxRetries: number = 3
): Promise<string> => {
  const asset = CDN_ASSETS[assetKey]
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const url = getCDNAssetUrl(assetKey)
      const response = await fetch(url, { method: 'HEAD' })
      
      if (response.ok) {
        return url
      }
      
      // If CDN fails, try fallback
      if (attempt === maxRetries) {
        return asset.fallbackPath
      }
    } catch (error) {
      console.warn(`Asset load attempt ${attempt} failed for ${assetKey}:`, error)
      
      if (attempt === maxRetries) {
        return asset.fallbackPath
      }
    }
  }
  
  return asset.fallbackPath
}

// Preload critical assets
export const preloadAssets = async (): Promise<void> => {
  const criticalAssets: (keyof typeof CDN_ASSETS)[] = ['arcticTerrain', 'polarBear', 'snowEnvironment']
  
  await Promise.allSettled(
    criticalAssets.map(assetKey => loadAssetWithRetry(assetKey))
  )
}

// Asset health check
export const checkAssetHealth = async (): Promise<Record<string, boolean>> => {
  const results: Record<string, boolean> = {}
  
  for (const [key, asset] of Object.entries(CDN_ASSETS)) {
    try {
      const url = getCDNAssetUrl(key as keyof typeof CDN_ASSETS)
      const response = await fetch(url, { method: 'HEAD' })
      results[key] = response.ok
    } catch (error) {
      results[key] = false
    }
  }
  
  return results
} 