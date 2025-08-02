"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Leaf, Play, Info, MapPin, Globe } from "lucide-react"

interface HeroSectionProps {
  currentRegion?: string
  onRegionSelect?: (region: string) => void
}

export function HeroSection({ currentRegion, onRegionSelect }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-teal-800/50 to-cyan-700/50"></div>
      
      {/* Animated Nature Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-emerald-300/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {i % 3 === 0 ? '🌿' : i % 3 === 1 ? '🌱' : '🍃'}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo and Title */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Globe className="h-12 w-12 text-emerald-300 animate-spin-slow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              <span className="text-emerald-300 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Nature
              </span>
              <span className="text-white ml-4">View</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-emerald-200 font-medium mb-8">
            Click on any region to explore wildlife from around the world
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Exploring
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MapPin className="h-5 w-5 mr-2" />
            Take Tour
          </Button>
        </div>

        {/* Current Region Indicator */}
        {currentRegion && (
          <div className="mt-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <MapPin className="h-4 w-4 text-emerald-300" />
              <span className="text-emerald-200 font-medium">Current: {currentRegion}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 