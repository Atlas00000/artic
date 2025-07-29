// Asset loading utility with fallback strategy
export interface AssetConfig {
  localPath: string
  cdnPath?: string
  fallbackType: 'primitive' | 'texture' | 'none'
}

export const ASSETS = {
  arcticTerrain: {
    localPath: '/assets/arctic_terrain1.glb',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/arctic_terrain1.glb',
    fallbackType: 'primitive' as const
  },
  polarBear: {
    localPath: '/assets/polar_bear.glb',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/polar_bear.glb',
    fallbackType: 'primitive' as const
  },
  snowEnvironment: {
    localPath: '/assets/snowenvrion_1k.hdr',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/snowenvrion_1k.hdr',
    fallbackType: 'none' as const
  }
}

export const getAssetPath = (assetKey: keyof typeof ASSETS): string => {
  const asset = ASSETS[assetKey]
  
  // In development, prefer local assets
  if (process.env.NODE_ENV === 'development') {
    return asset.localPath
  }
  
  // In production, try CDN first, then local
  return asset.cdnPath || asset.localPath
}

export const shouldUseFallback = (assetKey: keyof typeof ASSETS): boolean => {
  const asset = ASSETS[assetKey]
  return asset.fallbackType === 'primitive'
}

// Check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined'

// Check if assets are available locally
export const checkLocalAsset = async (path: string): Promise<boolean> => {
  if (!isBrowser) return false
  
  try {
    const response = await fetch(path, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
} 