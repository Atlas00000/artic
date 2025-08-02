"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, ChevronRight, Play, Info, X } from "lucide-react"

interface Region {
  id: string
  name: string
  displayName: string
  description: string
  position: { x: number; y: number }
  mobilePosition?: { x: number; y: number }
  color: string
  wildlife: string[]
}

const regions: Region[] = [
  {
    id: "arctic",
    name: "Arctic Life",
    displayName: "Arctic Life",
    description: "Explore the frozen wilderness of the Arctic",
    position: { x: 20, y: 35 },
    mobilePosition: { x: 25, y: 40 },
    color: "from-blue-400 to-cyan-500",
    wildlife: ["Polar Bear", "Arctic Fox", "Snowy Owl", "Seal"]
  },
  {
    id: "alpine",
    name: "Alpine Heights",
    displayName: "Alpine Heights",
    description: "Discover mountain wildlife and rugged terrain",
    position: { x: 20, y: 55 },
    mobilePosition: { x: 25, y: 60 },
    color: "from-gray-400 to-blue-400",
    wildlife: ["Mountain Goat", "Golden Eagle", "Marmot", "Alpine Ibex"]
  },
  {
    id: "coastal",
    name: "Coastal Waters",
    displayName: "Coastal Waters",
    description: "Dive into marine life and ocean ecosystems",
    position: { x: 70, y: 30 },
    mobilePosition: { x: 75, y: 35 },
    color: "from-blue-500 to-cyan-600",
    wildlife: ["Harbor Seal", "Humpback Whale", "Seagull", "Atlantic Cod"]
  },
  {
    id: "forest",
    name: "Forest Realm",
    displayName: "Forest Realm",
    description: "Wander through dense forests and woodland creatures",
    position: { x: 75, y: 50 },
    mobilePosition: { x: 75, y: 55 },
    color: "from-green-500 to-emerald-600",
    wildlife: ["Gray Wolf", "Red Deer", "Great Horned Owl", "Red Fox"]
  },
  {
    id: "global",
    name: "Global Safari",
    displayName: "Global Safari",
    description: "Experience wildlife from around the world",
    position: { x: 75, y: 60 },
    mobilePosition: { x: 75, y: 70 },
    color: "from-yellow-500 to-orange-500",
    wildlife: ["Lion", "Elephant", "Giraffe", "Zebra"]
  }
]

export function InteractiveMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId)
  }

  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId)
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Map Image - Full Screen */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/assets/homepage.png"
            alt="Nature View World Map"
            className="w-auto h-auto max-w-full max-h-full object-contain opacity-95 animate-scale-in"
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
          
          {/* Interactive Region Points */}
          {regions.map((region) => {
            const isHovered = hoveredRegion === region.id
            const isSelected = selectedRegion === region.id
            
            return (
              <div
                key={region.id}
                className="absolute cursor-pointer transition-all duration-500 group"
                style={{
                  left: `${isMobile && region.mobilePosition ? region.mobilePosition.x : region.position.x}%`,
                  top: `${isMobile && region.mobilePosition ? region.mobilePosition.y : region.position.y}%`,
                  transform: 'translate(-50%, -50%)' // Center the point
                }}
                onMouseEnter={() => handleRegionHover(region.id)}
                onMouseLeave={() => handleRegionHover(null)}
                onClick={() => handleRegionClick(region.id)}
              >
                {/* Clickable Point */}
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-500 ${
                    isSelected
                      ? 'bg-white border-white shadow-lg shadow-white/50 scale-125'
                      : isHovered
                      ? 'bg-white/80 border-white/80 scale-110'
                      : 'bg-white/20 border-white/60 hover:bg-white/40 hover:border-white'
                  }`}
                />
                
                {/* Pulse Effect for Hover */}
                {isHovered && (
                  <div className="absolute inset-0 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/80 animate-pulse" 
                       style={{ transform: 'translate(-50%, -50%)' }} />
                )}
                
                {/* Region Label */}
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded-full text-xs md:text-sm font-bold transition-all duration-500 whitespace-nowrap ${
                    isSelected || isHovered
                      ? 'bg-white text-gray-900 shadow-lg scale-110'
                      : 'bg-black/60 text-white'
                  }`}
                >
                  {region.displayName}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Region Info Panel - Responsive */}
      {selectedRegion && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 bg-white/15 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/30 shadow-2xl animate-fade-in max-w-xs md:max-w-md mx-4">
          <div className="text-center">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-lg md:text-2xl font-bold text-white">
                {regions.find(r => r.id === selectedRegion)?.displayName}
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedRegion(null)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-emerald-200 mb-3 md:mb-4 text-sm md:text-base">
              {regions.find(r => r.id === selectedRegion)?.description}
            </p>
            
            {/* Wildlife Preview */}
            <div className="mb-4">
              <p className="text-emerald-300 text-sm font-medium mb-2">Featured Wildlife:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {regions.find(r => r.id === selectedRegion)?.wildlife.slice(0, 3).map((animal, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30 animate-bounce-gentle"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {animal}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-center">
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                Explore
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Info className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons - Responsive */}
      <div className="absolute top-20 md:top-8 right-4 md:right-8 flex flex-col space-y-2 md:space-y-3">
        <Button
          size="sm"
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-xs md:text-sm"
        >
          <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">All Regions</span>
          <span className="sm:hidden">Regions</span>
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs md:text-sm"
        >
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Start Journey</span>
          <span className="sm:hidden">Start</span>
        </Button>
      </div>

      {/* Click outside to deselect */}
      {selectedRegion && (
        <div
          className="absolute inset-0 z-10"
          onClick={() => setSelectedRegion(null)}
        />
      )}
    </section>
  )
} 