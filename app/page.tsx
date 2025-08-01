"use client"

import React, { useState, useEffect, useCallback } from "react"
import { SceneViewport } from "@/components/scene/SceneViewport"
import { FloatingDataPanel } from "@/components/ui/floating-data-panel"
import { polarBearData } from "@/data/polar-bear-data"
import { preloadCriticalAssets, checkAssetHealth } from "@/utils/assetLoader"
import { preloadAssets } from "@/utils/cloudflare-cdn"
import { Button } from "@/components/ui/button"
import {
  Thermometer, Volume2, VolumeX, Moon, Sun, CloudSnow, Eye, EyeOff
} from "lucide-react"
import { useSoundSystem } from "@/hooks/useSoundSystem"

export default function ArcticLife() {
  const [theme, setTheme] = useState<'day' | 'night'>('day')
  const [sceneReady, setSceneReady] = useState(false)
  const [assetHealth, setAssetHealth] = useState<Record<string, boolean>>({})
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [uiVisible, setUiVisible] = useState(true)
  
  // Sound system integration
  const { 
    enable, 
    disable, 
    playAmbientSound, 
    playBearSound, 
    stopAllSounds 
  } = useSoundSystem()

  useEffect(() => {
    const initializeAssets = async () => {
      try {
        await Promise.allSettled([
          preloadAssets(),
          preloadCriticalAssets()
        ])
        const health = await checkAssetHealth()
        setAssetHealth(health)
      } catch (error) {
        console.error('Asset initialization failed:', error)
      }
    }
    initializeAssets()
  }, [])

  const handleSceneReady = useCallback(() => {
    setSceneReady(true)
    // Start ambient sounds when scene is ready
    if (soundEnabled) {
      enable()
      playAmbientSound()
    }
  }, [soundEnabled, enable, playAmbientSound])

  // Handle sound toggle
  const handleSoundToggle = () => {
    if (soundEnabled) {
      disable()
      setSoundEnabled(false)
    } else {
      enable()
      setSoundEnabled(true)
    }
  }

  // Handle UI visibility toggle
  const handleUiToggle = () => {
    setUiVisible(!uiVisible)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-700 arctic-gradient snow-pattern">
      {/* Main 3D Scene with top padding for navigation */}
      <div className="relative w-full h-screen pt-16">
        <SceneViewport
          className="w-full h-full"
          onSceneReady={handleSceneReady}
        />
        
        {/* Floating Controls - Responsive positioning */}
        <div className="absolute top-20 md:top-20 right-4 md:right-4 flex flex-col space-y-2 z-40">
          {/* Asset Health Indicator - Hidden on mobile to save space */}
          {process.env.NODE_ENV === 'development' && (
            <div className="hidden md:flex items-center space-x-2 bg-green-500/20 backdrop-blur-md rounded-full px-4 py-2 border border-green-400/30">
              <div className="flex space-x-1">
                {Object.entries(assetHealth).map(([asset, healthy]) => (
                  <div
                    key={asset}
                    className={`w-2 h-2 rounded-full ${healthy ? 'bg-green-400' : 'bg-red-400'}`}
                    title={`${asset}: ${healthy ? 'OK' : 'Failed'}`}
                  />
                ))}
              </div>
              <span className="text-green-200 text-xs font-medium">CDN</span>
            </div>
          )}

          {/* Temperature Display - Hidden on mobile to save space */}
          <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md rounded-full px-4 py-2 border border-red-400/30">
            <Thermometer className="h-4 w-4 text-red-300 animate-pulse" />
            <span className="text-red-200 text-sm font-bold">-15°C</span>
          </div>

          {/* UI Visibility Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleUiToggle}
            className="arctic-button text-white hover:bg-cyan-600/50 transition-all duration-300 hover:scale-110 backdrop-blur-md"
            aria-label={uiVisible ? "Hide UI" : "Show UI"}
          >
            {uiVisible ? (
              <Eye className="h-5 w-5 text-cyan-300" />
            ) : (
              <EyeOff className="h-5 w-5 text-red-300" />
            )}
          </Button>

          {/* Sound Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSoundToggle}
            className={`arctic-button text-white transition-all duration-300 hover:scale-110 backdrop-blur-md ${
              soundEnabled 
                ? 'hover:bg-cyan-600/50' 
                : 'hover:bg-red-600/50'
            }`}
            aria-label={soundEnabled ? "Disable Sound" : "Enable Sound"}
          >
            {soundEnabled ? (
              <Volume2 className="h-5 w-5 text-cyan-300" />
            ) : (
              <VolumeX className="h-5 w-5 text-red-300" />
            )}
          </Button>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'day' ? 'night' : 'day')}
            className="arctic-button text-white hover:bg-cyan-600/50 transition-all duration-300 hover:scale-110 backdrop-blur-md"
            aria-label={theme === 'day' ? "Switch to Night Mode" : "Switch to Day Mode"}
          >
            {theme === 'day' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          {/* Weather Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="arctic-button text-white hover:bg-cyan-600/50 transition-all duration-300 hover:scale-110 backdrop-blur-md"
            aria-label="Toggle Weather Effects"
          >
            <CloudSnow className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Floating Data Panel */}
      {sceneReady && uiVisible && <FloatingDataPanel animal={polarBearData} />}
    </div>
  )
}
