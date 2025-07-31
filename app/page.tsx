"use client"

import React, { useState, useEffect, useCallback } from "react"
import { SceneViewport } from "@/components/scene/SceneViewport"
import { FloatingDataPanel } from "@/components/ui/floating-data-panel"
import { polarBearData } from "@/data/polar-bear-data"
import { preloadCriticalAssets, checkAssetHealth } from "@/utils/assetLoader"
import { preloadAssets } from "@/utils/cloudflare-cdn"
import { Button } from "@/components/ui/button"
import {
  Snowflake, PawPrint, MapPin, Thermometer, Volume2, VolumeX,
  Moon, Sun, CloudSnow
} from "lucide-react"
import { useSoundSystem } from "@/hooks/useSoundSystem"

export default function ArcticLife() {
  const [theme, setTheme] = useState<'day' | 'night'>('day')
  const [sceneReady, setSceneReady] = useState(false)
  const [assetHealth, setAssetHealth] = useState<Record<string, boolean>>({})
  
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
    enable()
    playAmbientSound()
  }, [enable, playAmbientSound])

  // Handle sound toggle
  const handleSoundToggle = () => {
    // For now, just enable sound - you can add a state to track enabled/disabled
    enable()
  }

  // Predefined snowflake positions to avoid hydration mismatch
  const snowflakePositions = [
    { left: "10%", top: "20%", delay: "0s", duration: "3s" },
    { left: "25%", top: "45%", delay: "0.5s", duration: "4s" },
    { left: "40%", top: "15%", delay: "1s", duration: "3.5s" },
    { left: "55%", top: "70%", delay: "1.5s", duration: "4.2s" },
    { left: "70%", top: "30%", delay: "2s", duration: "3.8s" },
    { left: "85%", top: "60%", delay: "2.5s", duration: "4.5s" },
    { left: "15%", top: "80%", delay: "3s", duration: "3.2s" },
    { left: "30%", top: "10%", delay: "3.5s", duration: "4.8s" },
    { left: "45%", top: "55%", delay: "4s", duration: "3.7s" },
    { left: "60%", top: "25%", delay: "4.5s", duration: "4.1s" },
    { left: "75%", top: "75%", delay: "5s", duration: "3.9s" },
    { left: "90%", top: "40%", delay: "5.5s", duration: "4.3s" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-700 arctic-gradient snow-pattern">
      {/* Arctic-themed Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-r from-blue-900/95 via-cyan-800/95 to-blue-700/95 backdrop-blur-md border-b-2 border-cyan-400/40 shadow-2xl">
        {/* Animated Snowflakes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {snowflakePositions.map((pos, i) => (
            <div
              key={`snow-${i}`}
              className="absolute text-cyan-300/30 animate-float"
              style={{
                left: pos.left,
                top: pos.top,
                animationDelay: pos.delay,
                animationDuration: pos.duration,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <div className="relative flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative">
                <Snowflake className="h-10 w-10 text-cyan-300 animate-spin-slow group-hover:animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-white drop-shadow-lg flex items-center">
                  <span className="text-cyan-300 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Arctic
                  </span>
                  <span className="text-white ml-2">Life</span>
                  <span className="ml-2 text-2xl animate-pulse">❄️</span>
                </h1>
                <p className="text-cyan-200 text-sm font-medium">Polar Wildlife Explorer</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <div className="flex items-center space-x-2 bg-cyan-500/20 rounded-full px-4 py-2 border border-cyan-400/30">
                <PawPrint className="h-4 w-4 text-cyan-300" />
                <span className="text-cyan-200 text-sm font-medium">3D Polar Explorer</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/20 rounded-full px-4 py-2 border border-blue-400/30">
                <MapPin className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200 text-sm font-medium">Arctic Region</span>
              </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
            {/* Asset Health Indicator */}
            {process.env.NODE_ENV === 'development' && (
              <div className="hidden md:flex items-center space-x-2 bg-green-500/20 rounded-full px-4 py-2 border border-green-400/30">
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

            {/* Temperature Display */}
            <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full px-4 py-2 border border-red-400/30">
              <Thermometer className="h-4 w-4 text-red-300 animate-pulse" />
              <span className="text-red-200 text-sm font-bold">-15°C</span>
            </div>

            {/* Enhanced Sound Toggle */}
              <Button
                variant="ghost"
                size="icon"
              onClick={handleSoundToggle}
              className={`arctic-button text-white transition-all duration-300 hover:scale-110 ${
                enable 
                  ? 'hover:bg-cyan-600/50' 
                  : 'hover:bg-red-600/50'
              }`}
              aria-label={enable ? "Disable Sound" : "Enable Sound"}
              >
              {enable ? (
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
              className="arctic-button text-white hover:bg-cyan-600/50 transition-all duration-300 hover:scale-110"
                aria-label={theme === 'day' ? "Switch to Night Mode" : "Switch to Day Mode"}
              >
                {theme === 'day' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              
            {/* Weather Toggle */}
              <Button
                variant="ghost"
                size="icon"
              className="arctic-button text-white hover:bg-cyan-600/50 transition-all duration-300 hover:scale-110"
              aria-label="Toggle Weather Effects"
              >
              <CloudSnow className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

      {/* Main 3D Scene */}
      <div className="relative w-full h-screen pt-20">
        <SceneViewport
          className="w-full h-full"
          onSceneReady={handleSceneReady}
        />
      </div>
      
      {/* Floating Data Panel */}
      {sceneReady && <FloatingDataPanel animal={polarBearData} />}
    </div>
  )
}
