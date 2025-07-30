"use client"

import React, { useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { GLTFModel } from "@/components/gltf-model"
import { Plane, Box, Sphere } from "@react-three/drei"
import { getCDNAssetUrl, loadAssetWithRetry } from "@/utils/cloudflare-cdn"
import { getAssetPath, loadAssetWithHealthCheck } from "@/utils/assetLoader"

interface SceneViewportProps {
  className?: string
  onSceneReady?: () => void
}

export const SceneViewport: React.FC<SceneViewportProps> = ({
  className = "",
  onSceneReady,
}) => {
  const orbitControlsRef = useRef<any>(null)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [assetHealth, setAssetHealth] = useState<Record<string, boolean>>({})

  // Preload and health check assets
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Health check all assets
        const healthResults = await Promise.allSettled([
          loadAssetWithHealthCheck('arcticTerrain'),
          loadAssetWithHealthCheck('polarBear'),
          loadAssetWithHealthCheck('snowEnvironment')
        ])

        const health: Record<string, boolean> = {}
        healthResults.forEach((result, index) => {
          const assetNames = ['arcticTerrain', 'polarBear', 'snowEnvironment']
          health[assetNames[index]] = result.status === 'fulfilled'
        })

        setAssetHealth(health)
        setAssetsLoaded(true)
        
        if (onSceneReady) {
          onSceneReady()
        }
      } catch (error) {
        console.error('Asset preload failed:', error)
        setAssetsLoaded(true) // Continue anyway
      }
    }

    preloadAssets()
  }, [onSceneReady])

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = 2
          gl.outputColorSpace = "srgb"
        }}
      >
        {/* Enhanced Environment with Cloudflare CDN */}
        <Environment
          files={getCDNAssetUrl('snowEnvironment')}
          background
          resolution={1024}
        />

        {/* Arctic Terrain - Enhanced with CDN and fallback */}
        {assetHealth.arcticTerrain ? (
          <GLTFModel
            modelPath={getCDNAssetUrl('arcticTerrain')}
            position={[0, -0.5, 0]}
            rotation={[0, 0, 0]}
            scale={[0.05, 0.05, 0.05]}
            displayColor="#ffffff"
          />
        ) : (
          <Plane
            args={[20, 20]}
            position={[0, -0.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial
              color="#e0f2fe"
              roughness={0.8}
              metalness={0.1}
            />
          </Plane>
        )}

        {/* Polar Bear - Enhanced with CDN and fallback */}
        {assetHealth.polarBear ? (
          <GLTFModel
            modelPath={getCDNAssetUrl('polarBear')}
            position={[0, 0.9, 0]}
            rotation={[0, 0, 0]}
            scale={[1, 1, 1]}
            displayColor="#ffffff"
          />
        ) : (
          <>
            <Box
              position={[0, 0.5, 0]}
              scale={[1, 1.5, 2]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.9}
                metalness={0.1}
              />
            </Box>
            <Sphere
              position={[0, 1.5, 1]}
              scale={[0.8, 0.8, 0.8]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.9}
                metalness={0.1}
              />
            </Sphere>
          </>
        )}

        {/* Enhanced Orbital Camera Controls */}
        <OrbitControls
          makeDefault
          ref={orbitControlsRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
          minDistance={1}
          maxDistance={15}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
        />

        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
      </Canvas>

      {/* Asset Loading Indicator */}
      {!assetsLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Loading Arctic Assets...</p>
            <p className="text-sm text-cyan-200 mt-2">Optimizing for your location</p>
          </div>
        </div>
      )}

      {/* Asset Health Status (Debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
          <div className="font-semibold mb-2">Asset Health:</div>
          {Object.entries(assetHealth).map(([asset, healthy]) => (
            <div key={asset} className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${healthy ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>{asset}: {healthy ? 'OK' : 'Failed'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 