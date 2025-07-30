import { NextRequest, NextResponse } from 'next/server'
import { CLOUDFLARE_CONFIG } from '@/utils/cloudflare-cdn'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params
    const pathString = path.join('/')
    const cdnUrl = `${CLOUDFLARE_CONFIG.cdnDomain}/${pathString}`
    
    // Fetch from Cloudflare CDN
    const response = await fetch(cdnUrl, {
      headers: {
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept': request.headers.get('accept') || '*/*',
        'Accept-Encoding': request.headers.get('accept-encoding') || '',
      },
    })
    
    if (!response.ok) {
      return new NextResponse('Asset not found', { status: 404 })
    }
    
    // Get the asset data
    const assetData = await response.arrayBuffer()
    
    // Determine content type based on file extension
    const getContentType = (filename: string) => {
      const ext = filename.split('.').pop()?.toLowerCase()
      switch (ext) {
        case 'glb':
          return 'model/gltf-binary'
        case 'gltf':
          return 'model/gltf+json'
        case 'hdr':
          return 'image/vnd.radiance'
        case 'exr':
          return 'image/x-exr'
        default:
          return 'application/octet-stream'
      }
    }
    
    const contentType = getContentType(pathString)
    
    // Return the asset with proper headers
    return new NextResponse(assetData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD',
        'Access-Control-Allow-Headers': 'Range',
        'Content-Length': response.headers.get('content-length') || '',
        'ETag': response.headers.get('etag') || '',
        'Last-Modified': response.headers.get('last-modified') || '',
      },
    })
  } catch (error) {
    console.error('CDN proxy error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params
    const pathString = path.join('/')
    const cdnUrl = `${CLOUDFLARE_CONFIG.cdnDomain}/${pathString}`
    
    // Fetch headers from Cloudflare CDN
    const response = await fetch(cdnUrl, { method: 'HEAD' })
    
    if (!response.ok) {
      return new NextResponse('Asset not found', { status: 404 })
    }
    
    // Return headers only
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD',
        'Access-Control-Allow-Headers': 'Range',
        'Content-Length': response.headers.get('content-length') || '',
        'ETag': response.headers.get('etag') || '',
        'Last-Modified': response.headers.get('last-modified') || '',
      },
    })
  } catch (error) {
    console.error('CDN proxy error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 