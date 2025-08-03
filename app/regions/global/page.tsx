"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, MapPin, Thermometer, Wind, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const safariAnimals = [
  {
    name: "Lion",
    emoji: "🦁",
    description: "The majestic king of the jungle, lions are social predators that live in prides. They are excellent hunters and can take down prey much larger than themselves.",
    habitat: "Savanna",
    status: "Vulnerable"
  },
  {
    name: "Elephant",
    emoji: "🐘",
    description: "The largest land animals on Earth, elephants are highly intelligent and social creatures. They have excellent memories and form strong family bonds.",
    habitat: "Grasslands",
    status: "Endangered"
  },
  {
    name: "Zebra",
    emoji: "🦓",
    description: "These distinctive striped equines are excellent runners and live in herds for protection. Each zebra has a unique stripe pattern like a fingerprint.",
    habitat: "Savanna",
    status: "Near Threatened"
  },
  {
    name: "Giraffe",
    emoji: "🦒",
    description: "The tallest land animals, giraffes use their long necks to reach leaves high in trees. They have excellent eyesight and can run at high speeds.",
    habitat: "Savanna",
    status: "Vulnerable"
  },
  {
    name: "Cheetah",
    emoji: "🐆",
    description: "The fastest land animals, cheetahs can reach speeds of 70 mph in short bursts. They are excellent hunters but vulnerable to larger predators.",
    habitat: "Grasslands",
    status: "Vulnerable"
  },
  {
    name: "Hippopotamus",
    emoji: "🦛",
    description: "Despite their size, hippos are excellent swimmers and spend most of their time in water. They are considered one of the most dangerous animals in Africa.",
    habitat: "Watering Holes",
    status: "Vulnerable"
  }
]

export default function GlobalSafariRegion() {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return

    autoPlayRef.current = setInterval(() => {
      if (!isTransitioning) {
        setCurrentAnimalIndex((prev) => (prev + 1) % safariAnimals.length)
      }
    }, 6000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, isTransitioning])

  const nextAnimal = () => {
    if (isTransitioning) return
    
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    
    setIsTransitioning(true)
    setCurrentAnimalIndex((prev) => (prev + 1) % safariAnimals.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600)
  }

  const prevAnimal = () => {
    if (isTransitioning) return
    
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    
    setIsTransitioning(true)
    setCurrentAnimalIndex((prev) => (prev - 1 + safariAnimals.length) % safariAnimals.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600)
  }

  const currentAnimal = safariAnimals[currentAnimalIndex]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/safari_region.png"
          alt="Global Safari Region Map"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="text-6xl animate-pulse">
              <Globe className="text-yellow-200" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
                Global Safari
              </h1>
              <p className="text-xl text-yellow-200 drop-shadow-md">
                Experience the wild savanna and its magnificent wildlife
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* View in Habitat Button */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Button */}
              <Button 
                className="relative bg-gradient-to-r from-yellow-500/80 to-orange-500/80 hover:from-yellow-400/90 hover:to-orange-400/90 text-white border-0 backdrop-blur-sm px-10 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-yellow-500/50 animate-bounce"
              >
                <Eye className="h-6 w-6 mr-3 animate-pulse" />
                View in Habitat
                <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              </Button>
              
              {/* Floating particles effect */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-orange-300 rounded-full animate-ping delay-300"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-700"></div>
            </div>
          </div>

          {/* Animals Overview Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                🐾 Animals Overview
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevAnimal}
                  disabled={isTransitioning}
                  className="text-white hover:bg-white/20 p-2 transition-all duration-300 disabled:opacity-50 hover:scale-110"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-1">
                  {safariAnimals.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-400 ease-out ${
                        index === currentAnimalIndex ? 'bg-white scale-125' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextAnimal}
                  disabled={isTransitioning}
                  className="text-white hover:bg-white/20 p-2 transition-all duration-300 disabled:opacity-50 hover:scale-110"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Animal Slideshow */}
            <div className="relative overflow-hidden">
              <div 
                className={`will-change-opacity transition-opacity duration-600 ease-out ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  perspective: '1000px'
                }}
              >
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4 animate-pulse">
                    {currentAnimal.emoji}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {currentAnimal.name}
                  </h3>
                  <div className="flex justify-center space-x-4 mb-4">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-yellow-200 text-sm backdrop-blur-sm border border-white/20">
                      {currentAnimal.habitat}
                    </span>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-yellow-200 text-sm backdrop-blur-sm border border-white/20">
                      {currentAnimal.status}
                    </span>
                  </div>
                </div>
                <p className="text-yellow-200 text-lg leading-relaxed text-center max-w-3xl mx-auto">
                  {currentAnimal.description}
                </p>
              </div>
            </div>

            {/* Environment Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <Thermometer className="h-8 w-8 text-yellow-200 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Temperature</h4>
                <p className="text-yellow-200 text-sm">20°C to 35°C</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <Wind className="h-8 w-8 text-yellow-200 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Climate</h4>
                <p className="text-yellow-200 text-sm">Tropical Savanna</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <MapPin className="h-8 w-8 text-yellow-200 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Location</h4>
                <p className="text-yellow-200 text-sm">African Savanna</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 