"use client"

import React, { useState, useEffect, useRef } from "react"
import { InteractiveMap } from "@/components/homepage/InteractiveMap"
import { GlobalStatsBar } from "@/components/homepage/GlobalStatsBar"
import { Footer } from "@/components/homepage/Footer"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  Zap, 
  Star, 
  Award, 
  TrendingUp, 
  Users, 
  Target, 
  Globe, 
  ChevronRight,
  Play,
  Info,
  MapPin,
  Heart,
  Leaf,
  Activity
} from "lucide-react"

interface Achievement {
  icon: any
  label: string
  color: string
  value: string
  trend: string
}

interface QuickAction {
  icon: any
  label: string
  description: string
  color: string
  gradient: string
}

export function DesktopHomepage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const achievements: Achievement[] = [
    { icon: Award, label: "Conservation Hero", value: "Level 5", trend: "+2 levels", color: "text-yellow-300" },
    { icon: TrendingUp, label: "Rising Explorer", value: "Top 10%", trend: "+15%", color: "text-emerald-300" },
    { icon: Users, label: "Community Leader", value: "2,341", trend: "+89", color: "text-blue-300" }
  ]

  const quickActions: QuickAction[] = [
    {
      icon: Play,
      label: "Start Journey",
      description: "Begin your wildlife exploration",
      color: "text-emerald-200",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      icon: MapPin,
      label: "View All Regions",
      description: "Explore all wildlife habitats",
      color: "text-blue-200",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Heart,
      label: "Conservation",
      description: "Support wildlife protection",
      color: "text-pink-200",
      gradient: "from-pink-500/20 to-rose-500/20"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700 nature-view-gradient overflow-hidden">
      {/* Background Map Image */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
             style={{
               backgroundImage: 'url("/assets/homepage.png")',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'brightness(0.8) contrast(1.2)'
             }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-800/60 to-cyan-700/60" />
      </div>

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
        
        {/* Animated Light Rays */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Enhanced Stats Bar with Animations */}
      <div className="relative z-10">
        <GlobalStatsBar />
        
        {/* Achievement Showcase */}
        <div className="flex justify-center space-x-6 mt-6 px-8">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className={`flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 animate-fade-in transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
                activeIndex === index ? 'ring-2 ring-emerald-400 shadow-lg' : ''
              }`}
              style={{ animationDelay: `${0.5 + index * 0.2}s` }}
            >
              <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
              <div>
                <div className="text-sm font-medium text-white">{achievement.label}</div>
                <div className="text-xs text-emerald-200">{achievement.value}</div>
              </div>
              <div className="text-xs text-emerald-300 font-bold">{achievement.trend}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions Panel */}
        <div className="flex justify-center space-x-4 mt-6 px-8">
          {quickActions.map((action, index) => (
            <Button
              key={action.label}
              className={`px-6 py-3 bg-gradient-to-r ${action.gradient} hover:from-emerald-500/30 hover:to-teal-500/30 ${action.color} text-sm border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 animate-fade-in shadow-lg hover:shadow-emerald-500/25`}
              style={{ animationDelay: `${1.2 + index * 0.2}s` }}
              onMouseEnter={() => setHoveredAction(action.label)}
              onMouseLeave={() => setHoveredAction(null)}
            >
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Interactive Map Section */}
      <div className="relative z-10 mt-8">
        <InteractiveMap />
      </div>

      {/* Bottom Zone - Detailed Sections and Widgets */}
      <div className="relative z-10 mt-8">
        <div className="bg-gradient-to-b from-blue-900/30 to-cyan-900/30 border-t border-white/20">
          <div className="max-w-6xl mx-auto px-8 py-12">
            
            {/* Featured Content Carousel */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center animate-fade-in">
                Conservation Spotlight
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Arctic Polar Bear Protection",
                    description: "Supporting critical habitat preservation in the Arctic region",
                    icon: "🐻‍❄️",
                    progress: 75,
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    title: "Forest Reforestation Project",
                    description: "Planting 10,000 trees in endangered forest regions",
                    icon: "🌲",
                    progress: 60,
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    title: "Marine Life Conservation",
                    description: "Protecting coral reefs and marine ecosystems",
                    icon: "🐠",
                    progress: 45,
                    color: "from-blue-600 to-teal-500"
                  }
                ].map((project, index) => (
                  <div
                    key={project.title}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:scale-105 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                  >
                    <div className="text-4xl mb-4">{project.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                    <p className="text-emerald-200 text-sm mb-4">{project.description}</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-emerald-200 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${project.color} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm">
                      Learn More
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Facts Ticker */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center animate-fade-in" style={{ animationDelay: '1s' }}>
                Did You Know?
              </h3>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center space-x-8 text-center">
                  {[
                    { fact: "Polar bears can smell seals from 20 miles away", icon: "👃" },
                    { fact: "Elephants are the only mammals that can't jump", icon: "🐘" },
                    { fact: "A group of flamingos is called a 'flamboyance'", icon: "🦩" },
                    { fact: "Octopuses have three hearts and blue blood", icon: "🐙" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: `${1.2 + index * 0.1}s` }}>
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-emerald-200 text-sm font-medium">{item.fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conservation Focus - Impact Tracker */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center animate-fade-in" style={{ animationDelay: '1.5s' }}>
                Conservation Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Trees Planted", value: "1,247", icon: "🌱", color: "text-green-300", trend: "+89" },
                  { label: "Wildlife Protected", value: "89", icon: "🦁", color: "text-yellow-300", trend: "+5" },
                  { label: "Community Members", value: "2,341", icon: "👥", color: "text-blue-300", trend: "+23" },
                  { label: "Lessons Completed", value: "45", icon: "📚", color: "text-purple-300", trend: "+2" }
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center hover:scale-105 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${1.7 + index * 0.1}s` }}
                  >
                    <div className={`text-3xl mb-3 ${stat.color}`}>{stat.icon}</div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-emerald-200 mb-2">{stat.label}</div>
                    <div className="text-xs text-emerald-300 font-bold">{stat.trend}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Timeline */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center animate-fade-in" style={{ animationDelay: '2s' }}>
                Wildlife Timeline
              </h3>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  {[
                    { period: "Spring Migration", icon: "🦅", description: "Birds return north", month: "Mar-May" },
                    { period: "Summer Breeding", icon: "🦊", description: "Wildlife reproduction", month: "Jun-Aug" },
                    { period: "Fall Preparation", icon: "🐻", description: "Hibernation prep", month: "Sep-Nov" },
                    { period: "Winter Survival", icon: "🐺", description: "Cold weather adaptation", month: "Dec-Feb" }
                  ].map((season, index) => (
                    <div key={season.period} className="flex flex-col items-center space-y-2 animate-fade-in" style={{ animationDelay: `${2.2 + index * 0.1}s` }}>
                      <div className="text-3xl">{season.icon}</div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-white">{season.period}</div>
                        <div className="text-xs text-emerald-200">{season.description}</div>
                        <div className="text-xs text-emerald-300">{season.month}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real Conservation Projects */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center animate-fade-in" style={{ animationDelay: '2.5s' }}>
                Real Conservation Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Amazon Rainforest Protection",
                    description: "Supporting indigenous communities to protect 1 million acres of rainforest",
                    impact: "500+ species protected",
                    status: "Active",
                    color: "from-green-500 to-emerald-600"
                  },
                  {
                    title: "Arctic Sea Ice Monitoring",
                    description: "Tracking polar bear populations and sea ice changes in real-time",
                    impact: "1,000+ bears tracked",
                    status: "Ongoing",
                    color: "from-blue-500 to-cyan-600"
                  }
                ].map((project, index) => (
                  <div
                    key={project.title}
                    className={`bg-gradient-to-r ${project.color} bg-opacity-20 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:scale-105 transition-all duration-300 animate-fade-in`}
                    style={{ animationDelay: `${2.7 + index * 0.2}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">{project.title}</h4>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-200 text-xs rounded-full border border-emerald-400/30">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-emerald-200 text-sm mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300 text-sm font-medium">{project.impact}</span>
                      <Button className="bg-white/20 hover:bg-white/30 text-white text-sm">
                        Support Project
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="relative z-10 mt-8">
        <Footer />
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110 animate-bounce-gentle"
          style={{ animationDelay: '2s' }}
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      </div>

      {/* Animated Corner Decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none opacity-30">
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-emerald-400 animate-pulse" />
        <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-emerald-300 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none opacity-30">
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-emerald-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-8 right-8 w-4 h-4 border-r border-t border-emerald-300 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  )
} 