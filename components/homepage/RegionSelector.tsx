"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Snowflake, Mountain, TreePine, Waves, Globe,
  MapPin, ChevronRight
} from "lucide-react"

interface Region {
  id: string
  name: string
  displayName: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isUnlocked: boolean
  previewImage: string
  wildlife: string[]
}

const regions: Region[] = [
  {
    id: "arctic",
    name: "Arctic Life",
    displayName: "Arctic Life",
    description: "Polar bears, arctic foxes, snowy owls",
    icon: Snowflake,
    isUnlocked: true,
    previewImage: "/assets/arctic-preview.jpg",
    wildlife: ["Polar Bear", "Arctic Fox", "Snowy Owl", "Seal"]
  },
  {
    id: "alpine",
    name: "Alpine Heights",
    displayName: "Alpine Heights",
    description: "Mountain goats, eagles, marmots",
    icon: Mountain,
    isUnlocked: true,
    previewImage: "/assets/alpine-preview.jpg",
    wildlife: ["Mountain Goat", "Golden Eagle", "Marmot", "Alpine Ibex"]
  },
  {
    id: "forest",
    name: "Forest Realm",
    displayName: "Forest Realm",
    description: "Wolves, deer, owls, foxes",
    icon: TreePine,
    isUnlocked: true,
    previewImage: "/assets/forest-preview.jpg",
    wildlife: ["Gray Wolf", "Red Deer", "Great Horned Owl", "Red Fox"]
  },
  {
    id: "coastal",
    name: "Coastal Waters",
    displayName: "Coastal Waters",
    description: "Seals, whales, seabirds, fish",
    icon: Waves,
    isUnlocked: true,
    previewImage: "/assets/coastal-preview.jpg",
    wildlife: ["Harbor Seal", "Humpback Whale", "Seagull", "Atlantic Cod"]
  },
  {
    id: "global",
    name: "Global Safari",
    displayName: "Global Safari",
    description: "Worldwide wildlife showcase",
    icon: Globe,
    isUnlocked: true,
    previewImage: "/assets/global-preview.jpg",
    wildlife: ["Lion", "Elephant", "Giraffe", "Zebra"]
  }
]

interface RegionSelectorProps {
  onRegionSelect?: (region: string) => void
  currentRegion?: string
}

export function RegionSelector({ onRegionSelect, currentRegion }: RegionSelectorProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const handleRegionClick = (regionId: string) => {
    onRegionSelect?.(regionId)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-emerald-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
            Each region unlocks different wildlife and learning experiences
          </p>
        </div>

        {/* Region Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region) => {
            const IconComponent = region.icon
            const isCurrent = currentRegion === region.id
            const isHovered = hoveredRegion === region.id

            return (
              <div
                key={region.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isCurrent ? 'scale-105' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => handleRegionClick(region.id)}
              >
                {/* Region Card */}
                <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 transition-all duration-300 ${
                  isCurrent 
                    ? 'border-emerald-400 bg-emerald-500/20' 
                    : 'border-white/20 hover:border-emerald-300 hover:bg-emerald-500/10'
                }`}>
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-emerald-500/30 text-emerald-300' 
                        : 'bg-white/20 text-white group-hover:bg-emerald-500/30 group-hover:text-emerald-300'
                    }`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    {isCurrent && (
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">
                      {region.displayName}
                    </h3>
                    <p className="text-emerald-200 text-sm">
                      {region.description}
                    </p>
                    
                    {/* Wildlife Preview */}
                    <div className="pt-3 border-t border-white/20">
                      <p className="text-xs text-emerald-300 mb-2 font-medium">Featured Wildlife:</p>
                      <div className="flex flex-wrap gap-1">
                        {region.wildlife.slice(0, 3).map((animal, index) => (
                          <span
                            key={index}
                            className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                          >
                            {animal}
                          </span>
                        ))}
                        {region.wildlife.length > 3 && (
                          <span className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full">
                            +{region.wildlife.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl border-2 border-emerald-300/50 transition-all duration-300"></div>
                  )}

                  {/* Action Button */}
                  <div className="absolute bottom-4 right-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`transition-all duration-300 ${
                        isCurrent 
                          ? 'text-emerald-300 hover:text-emerald-200' 
                          : 'text-white/70 group-hover:text-emerald-300'
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Current Region Badge */}
                {isCurrent && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white">
                    Current
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-emerald-200 mb-4">
            Click on any region to start exploring
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MapPin className="h-5 w-5 mr-2" />
            Explore All Regions
          </Button>
        </div>
      </div>
    </section>
  )
} 