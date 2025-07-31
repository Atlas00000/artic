"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { 
  MapPin, Utensils, Shield, Info, Snowflake, PawPrint, Heart, AlertTriangle, 
  Droplets, Thermometer, Zap, Play, Pause, Volume2, VolumeX, Star, Eye, Target, Wind, Waves, EyeOff
} from "lucide-react"
import { useSoundSystem } from "@/hooks/useSoundSystem"

interface Animal {
  name: string
  scientificName: string
  habitat: string
  diet: string[]
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered"
  funFacts: string[]
  stats: {
    weight: string
    height: string
    lifespan: string
    speed: string
  }
  image?: string
}

interface FloatingDataPanelProps {
  animal: Animal
}

const conservationStatusColors = {
  "Least Concern": "bg-green-500/20 text-green-700 border-green-300",
  "Near Threatened": "bg-yellow-500/20 text-yellow-700 border-yellow-300",
  "Vulnerable": "bg-orange-500/20 text-orange-700 border-orange-300",
  "Endangered": "bg-red-500/20 text-red-700 border-red-300",
  "Critically Endangered": "bg-red-600/20 text-red-800 border-red-400"
}

const conservationStatusIcons = {
  "Least Concern": <Heart className="h-4 w-4" />,
  "Near Threatened": <AlertTriangle className="h-4 w-4" />,
  "Vulnerable": <AlertTriangle className="h-4 w-4" />,
  "Endangered": <AlertTriangle className="h-4 w-4" />,
  "Critically Endangered": <AlertTriangle className="h-4 w-4" />
}

export const FloatingDataPanel: React.FC<FloatingDataPanelProps> = ({ animal }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null)
  const [pulseEffect, setPulseEffect] = useState(false)
  const [showUI, setShowUI] = useState(true)

  // Sound system integration
  const { playBearSound } = useSoundSystem()

  // Auto-rotate facts with enhanced timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % animal.funFacts.length)
      setPulseEffect(true)
      setTimeout(() => setPulseEffect(false), 500)
    }, 8000) // Increased to 8 seconds for better readability

    return () => clearInterval(interval)
  }, [animal.funFacts.length])

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev)
    // Play bear sound when toggling
    playBearSound()
  }, [playBearSound])

  const toggleStats = useCallback(() => {
    setShowStats(prev => !prev)
    // Play bear sound when toggling stats
    playBearSound()
  }, [playBearSound])

  const toggleUI = useCallback(() => {
    setShowUI(!showUI)
    // Play bear sound when toggling UI
    playBearSound()
  }, [showUI, playBearSound])

  // Handle panel hover with sound
  const handlePanelHover = useCallback((panel: string) => {
    setHoveredPanel(panel)
    // Play subtle bear sound on hover
    playBearSound()
  }, [playBearSound])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {/* UI Toggle Button - Always visible */}
      <div className="absolute top-4 right-4 z-40 pointer-events-auto">
        <Button
          onClick={toggleUI}
          size="sm"
          variant="ghost"
          className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-110"
          aria-label={showUI ? "Hide UI" : "Show UI"}
        >
          {showUI ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {/* Top Panel - Animal Name & Status */}
      <div className={`absolute top-24 md:top-16 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
        showUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div 
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-2 md:p-4 border border-white/20 shadow-2xl transition-all duration-500 max-w-[85vw] md:max-w-none pointer-events-auto ${
            hoveredPanel === 'top' ? 'bg-white/20 scale-105' : ''
          }`}
          onMouseEnter={() => handlePanelHover('top')}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-500/20 rounded-full animate-pulse">
              <PawPrint className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-center">
              <h1 className="text-lg md:text-2xl font-bold text-white flex items-center justify-center">
                {animal.name}
                <Snowflake className="h-4 w-4 md:h-5 md:w-5 ml-2 text-blue-300 animate-spin-slow" />
              </h1>
              <p className="text-xs md:text-sm text-blue-200 italic">{animal.scientificName}</p>
            </div>
            <div className={`inline-flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 ${conservationStatusColors[animal.conservationStatus]} backdrop-blur-sm border-2 font-bold text-sm px-3 py-1 transition-all duration-300 hover:scale-110`}>
              <div className="flex items-center space-x-1">
                {conservationStatusIcons[animal.conservationStatus]}
                <span>{animal.conservationStatus}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSound}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Left Panel - Habitat & Stats (Desktop) */}
      <div className={`absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 transition-all duration-500 hidden md:block ${
        showUI ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
      }`}>
        <div 
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/20 shadow-2xl max-w-[140px] md:max-w-xs transition-all duration-500 pointer-events-auto ${
            hoveredPanel === 'left' ? 'bg-white/20 scale-105' : ''
          }`}
          onMouseEnter={() => handlePanelHover('left')}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-xs md:text-sm font-semibold text-white">Habitat</span>
            </div>
            <p className="text-xs text-blue-200 leading-relaxed">{animal.habitat}</p>
            
            {showStats && (
              <div className="space-y-2 pt-2 border-t border-white/20">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-3 w-3 text-cyan-400" />
                  <span className="text-xs text-cyan-200">Weight: {animal.stats.weight}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-3 w-3 text-cyan-400" />
                  <span className="text-xs text-cyan-200">Height: {animal.stats.height}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-3 w-3 text-cyan-400" />
                  <span className="text-xs text-cyan-200">Lifespan: {animal.stats.lifespan}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-3 w-3 text-cyan-400" />
                  <span className="text-xs text-cyan-200">Speed: {animal.stats.speed}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Diet & Fun Facts (Desktop) */}
      <div className={`absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 transition-all duration-500 hidden md:block ${
        showUI ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      }`}>
        <div 
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/20 shadow-2xl max-w-[140px] md:max-w-xs transition-all duration-500 pointer-events-auto ${
            hoveredPanel === 'right' ? 'bg-white/20 scale-105' : ''
          }`}
          onMouseEnter={() => handlePanelHover('right')}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Utensils className="h-4 w-4 text-green-400" />
              <span className="text-xs md:text-sm font-semibold text-white">Diet</span>
            </div>
            <div className="space-y-1">
              {animal.diet.map((food, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-200">{food}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-2 border-t border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-4 w-4 text-yellow-400" />
                <span className="text-xs md:text-sm font-semibold text-white">Fun Fact</span>
              </div>
              <p className={`text-xs text-yellow-200 leading-relaxed transition-all duration-300 ${
                pulseEffect ? 'scale-105' : ''
              }`}>
                {animal.funFacts[currentFactIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel - Conservation Info (Desktop) */}
      <div className={`absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 hidden md:block ${
        showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div 
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/20 shadow-2xl transition-all duration-500 pointer-events-auto ${
            hoveredPanel === 'bottom' ? 'bg-white/20 scale-105' : ''
          }`}
          onMouseEnter={() => handlePanelHover('bottom')}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-400" />
              <span className="text-sm font-semibold text-white">Conservation Status</span>
            </div>
            <div className={`inline-flex items-center rounded-full ${conservationStatusColors[animal.conservationStatus]} border-2 font-bold text-xs px-3 py-1 transition-all duration-300 hover:scale-110`}>
              <div className="flex items-center space-x-1">
                {conservationStatusIcons[animal.conservationStatus]}
                <span>{animal.conservationStatus}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-orange-200 mt-2 leading-relaxed">
            This species faces threats from climate change, habitat loss, and human activities. 
            Conservation efforts are crucial for their survival.
          </p>
        </div>
      </div>

      {/* Mobile Layout - Stacked Information */}
      <div className={`absolute bottom-2 left-2 right-2 md:hidden transition-all duration-500 max-h-[30vh] overflow-y-auto ${
        showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl pointer-events-auto">
          <div className="space-y-2">
            {/* Mobile Habitat & Stats Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-blue-400" />
                  <span className="text-xs font-semibold text-white">Habitat</span>
                </div>
                <p className="text-xs text-blue-200 leading-tight">{animal.habitat}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Thermometer className="h-3 w-3 text-cyan-400" />
                  <span className="text-xs font-semibold text-white">Stats</span>
                </div>
                <div className="text-xs text-cyan-200 space-y-0.5">
                  <div>W: {animal.stats.weight}</div>
                  <div>H: {animal.stats.height}</div>
                </div>
              </div>
            </div>
            {/* Mobile Diet & Fun Facts Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Utensils className="h-3 w-3 text-green-400" />
                  <span className="text-xs font-semibold text-white">Diet</span>
                </div>
                <div className="text-xs text-green-200 space-y-0.5">
                  {animal.diet.slice(0, 2).map((food, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                      <span>{food}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Info className="h-3 w-3 text-yellow-400" />
                  <span className="text-xs font-semibold text-white">Fun Fact</span>
                </div>
                <p className={`text-xs text-yellow-200 leading-tight transition-all duration-300 ${
                  pulseEffect ? 'scale-105' : ''
                }`}>
                  {animal.funFacts[currentFactIndex]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-300/40 rounded-full animate-float"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 8)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
} 