"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, ChevronRight, Play, Info, X, Globe, Leaf, Heart, Sparkles, Zap, Star, Award, TrendingUp, Users, Target } from "lucide-react"

interface MobileRegion {
  id: string
  name: string
  displayName: string
  description: string
  icon: string
  color: string
  wildlife: string[]
  gradient: string
  difficulty: string
  completion: number
}

const mobileRegions: MobileRegion[] = [
  {
    id: "arctic",
    name: "Arctic Life",
    displayName: "Arctic Life",
    description: "Explore the frozen wilderness of the Arctic",
    icon: "❄️",
    color: "from-blue-400 to-cyan-500",
    gradient: "from-blue-500/20 to-cyan-500/20",
    wildlife: ["Polar Bear", "Arctic Fox", "Snowy Owl", "Seal"],
    difficulty: "Beginner",
    completion: 85
  },
  {
    id: "alpine",
    name: "Alpine Heights",
    displayName: "Alpine Heights",
    description: "Discover mountain wildlife and rugged terrain",
    icon: "🏔️",
    color: "from-gray-400 to-blue-400",
    gradient: "from-gray-500/20 to-blue-500/20",
    wildlife: ["Mountain Goat", "Golden Eagle", "Marmot", "Alpine Ibex"],
    difficulty: "Intermediate",
    completion: 60
  },
  {
    id: "coastal",
    name: "Coastal Waters",
    displayName: "Coastal Waters",
    description: "Dive into marine life and ocean ecosystems",
    icon: "🌊",
    color: "from-blue-500 to-cyan-600",
    gradient: "from-blue-600/20 to-cyan-600/20",
    wildlife: ["Harbor Seal", "Humpback Whale", "Seagull", "Atlantic Cod"],
    difficulty: "Advanced",
    completion: 40
  },
  {
    id: "forest",
    name: "Forest Realm",
    displayName: "Forest Realm",
    description: "Wander through dense forests and woodland creatures",
    icon: "🌲",
    color: "from-green-500 to-emerald-600",
    gradient: "from-green-500/20 to-emerald-600/20",
    wildlife: ["Gray Wolf", "Red Deer", "Great Horned Owl", "Red Fox"],
    difficulty: "Intermediate",
    completion: 75
  },
  {
    id: "global",
    name: "Global Safari",
    displayName: "Global Safari",
    description: "Experience wildlife from around the world",
    icon: "🌍",
    color: "from-yellow-500 to-orange-500",
    gradient: "from-yellow-500/20 to-orange-500/20",
    wildlife: ["Lion", "Elephant", "Giraffe", "Zebra"],
    difficulty: "Expert",
    completion: 25
  }
]

export function MobileHomepage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 150)
    }
    
    const element = scrollRef.current
    if (element) {
      element.addEventListener('scroll', handleScroll)
      return () => element.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId)
  }

  const stats = [
    { value: "150+", label: "Species", icon: "🐾", color: "text-emerald-300", trend: "+12%" },
    { value: "3/5", label: "Regions", icon: "🌍", color: "text-blue-300", trend: "+1" },
    { value: "1,247", label: "Trees", icon: "🌱", color: "text-green-300", trend: "+89" }
  ]

  const achievements = [
    { icon: Award, label: "Conservation Hero", color: "text-yellow-300" },
    { icon: TrendingUp, label: "Rising Explorer", color: "text-emerald-300" },
    { icon: Users, label: "Community Leader", color: "text-blue-300" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700 pt-16 overflow-hidden">
      {/* Background Map Image */}
      <div className="fixed inset-0 pointer-events-none opacity-15">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
             style={{
               backgroundImage: 'url("/assets/homepage.png")',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'brightness(0.7) contrast(1.3)'
             }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-teal-800/70 to-cyan-700/70" />
      </div>

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Animated Light Rays */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative z-10">
        <div className="w-full h-48 bg-gradient-to-b from-white/15 to-transparent backdrop-blur-md border-b border-white/20">
          <div className="flex flex-col h-full px-6">
            {/* Animated Title with Glow Effect */}
            <div className="text-center pt-6 mb-6">
              <div className="relative">
                <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-gradient-x">
                    Nature View
                  </span>
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 blur-xl animate-pulse" />
              </div>
              <p className="text-emerald-200 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Global Wildlife Explorer
              </p>
            </div>

            {/* Enhanced Stats with Trends */}
            <div className="flex justify-between items-center h-24">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center text-center transform transition-all duration-700 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                >
                  <div className={`text-3xl mb-2 animate-bounce-gentle ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-white mb-1 animate-count-up">
                    {stat.value}
                  </div>
                  <div className="text-xs text-emerald-200 font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-emerald-300 font-bold animate-fade-in" style={{ animationDelay: `${1 + index * 0.2}s` }}>
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="flex justify-center space-x-3 mt-4 px-6">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 animate-fade-in"
              style={{ animationDelay: `${1.2 + index * 0.1}s` }}
            >
              <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
              <span className="text-xs text-white font-medium">{achievement.label}</span>
            </div>
          ))}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex justify-center space-x-4 mt-4 px-6">
          <Button 
            className="px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-200 text-sm border border-emerald-400/30 backdrop-blur-md transition-all duration-300 hover:scale-105 animate-fade-in shadow-lg hover:shadow-emerald-500/25"
            style={{ animationDelay: '1.5s' }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            View Progress
          </Button>
          <Button 
            className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-blue-200 text-sm border border-blue-400/30 backdrop-blur-md transition-all duration-300 hover:scale-105 animate-fade-in shadow-lg hover:shadow-blue-500/25"
            style={{ animationDelay: '1.7s' }}
          >
            <Zap className="h-4 w-4 mr-2" />
            Join Community
          </Button>
        </div>
      </div>

      {/* Enhanced Regions Section */}
      <div className="p-6" ref={scrollRef}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3 animate-fade-in" style={{ animationDelay: '1.9s' }}>
            Choose Your Adventure
          </h2>
          <p className="text-emerald-200 text-sm animate-fade-in" style={{ animationDelay: '2.1s' }}>
            Tap on a region to explore wildlife
          </p>
        </div>
        
        <div className="space-y-4">
          {mobileRegions.map((region, index) => (
            <div
              key={region.id}
              className={`relative overflow-hidden bg-gradient-to-r ${region.gradient} backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-500 transform ${
                selectedRegion === region.id 
                  ? 'ring-2 ring-emerald-400 scale-105 shadow-2xl' 
                  : 'hover:scale-105 hover:shadow-xl'
              } ${
                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              } ${isScrolling ? 'scale-95' : ''}`}
              style={{ animationDelay: `${2.3 + index * 0.2}s` }}
              onClick={() => handleRegionClick(region.id)}
            >
              {/* Enhanced Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="text-5xl animate-bounce-gentle">{region.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{region.displayName}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">
                        {region.difficulty}
                      </span>
                      <span className="text-xs text-emerald-200">
                        {region.completion}% complete
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <div className="w-8 h-8 rounded-full border-2 border-emerald-400 relative">
                        <div 
                          className="absolute inset-0 rounded-full bg-emerald-400"
                          style={{ 
                            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                            transform: `rotate(${region.completion * 3.6}deg)`
                          }}
                        />
                      </div>
                    </div>
                    <ChevronRight className="text-white/60 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                
                <p className="text-emerald-200 text-sm mb-3 leading-relaxed">{region.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {region.wildlife.slice(0, 3).map((animal, animalIndex) => (
                    <span
                      key={animalIndex}
                      className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/20 animate-fade-in hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${2.7 + index * 0.2 + animalIndex * 0.1}s` }}
                    >
                      {animal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer with Stats */}
      <div className="mt-8 p-6 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm">
        <div className="text-center animate-fade-in" style={{ animationDelay: '3.5s' }}>
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Globe className="h-6 w-6 text-emerald-300 animate-spin-slow" />
            <span className="text-white font-bold text-lg">Nature View</span>
            <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-emerald-200 text-sm mb-3">Global Wildlife Explorer</p>
          
          {/* Quick Stats */}
          <div className="flex justify-center space-x-6 text-xs text-emerald-200">
            <div className="flex items-center space-x-1">
              <Target className="h-3 w-3" />
              <span>Daily Goal: 85%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>2,341 Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Region Detail Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 w-full max-w-sm border border-white/30 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-4xl animate-bounce-gentle">
                  {mobileRegions.find(r => r.id === selectedRegion)?.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {mobileRegions.find(r => r.id === selectedRegion)?.displayName}
                  </h3>
                  <p className="text-emerald-300 text-sm">
                    {mobileRegions.find(r => r.id === selectedRegion)?.difficulty} Level
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedRegion(null)}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-emerald-200 mb-6 leading-relaxed">
              {mobileRegions.find(r => r.id === selectedRegion)?.description}
            </p>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-emerald-200">Progress</span>
                <span className="text-emerald-300 font-bold">
                  {mobileRegions.find(r => r.id === selectedRegion)?.completion}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${mobileRegions.find(r => r.id === selectedRegion)?.completion}%` }}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-emerald-300 text-sm font-medium mb-3">Featured Wildlife:</p>
              <div className="flex flex-wrap gap-2">
                {mobileRegions.find(r => r.id === selectedRegion)?.wildlife.map((animal, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white border border-white/20 animate-bounce-gentle hover:scale-105 transition-transform duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {animal}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
                <Play className="h-4 w-4 mr-2" />
                Explore
              </Button>
              <Button className="flex-1 border-white/30 text-white hover:bg-white/10 font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg" variant="outline">
                <Info className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 