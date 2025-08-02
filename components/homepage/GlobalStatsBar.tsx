"use client"

import React, { useState, useEffect } from "react"
import { StatItem } from "./StatItem"
import { TrendingUp, Users, Award, Activity } from "lucide-react"

interface GlobalStatsBarProps {
  className?: string
}

export function GlobalStatsBar({ className }: GlobalStatsBarProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTrend, setActiveTrend] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setActiveTrend((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const trends = [
    { value: "+12%", color: "text-emerald-300" },
    { value: "+1", color: "text-blue-300" },
    { value: "+89", color: "text-green-300" }
  ]

  return (
    <div className={`w-full h-32 md:h-28 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md border-b border-white/20 mt-16 ${className}`}>
      <div className="flex flex-col h-full px-4 md:px-8">
        {/* Enhanced Main Stats Row */}
        <div className="flex justify-between items-center h-16 md:h-14">
          <div className="flex space-x-2 md:space-x-6 lg:space-x-12 w-full justify-center md:justify-between">
            {/* Wildlife Species Count */}
            <StatItem 
              icon="🐾" 
              label="Species" 
              value="150+" 
              subtext="discovered"
              color="from-emerald-400 to-teal-500"
              trend={trends[0]}
              isActive={activeTrend === 0}
            />
            
            {/* Regions Explored Progress */}
            <StatItem 
              icon="🌍" 
              label="Regions" 
              value="3/5" 
              subtext="explored"
              color="from-blue-400 to-cyan-500"
              progress={60}
              trend={trends[1]}
              isActive={activeTrend === 1}
            />
            
            {/* Conservation Impact */}
            <StatItem 
              icon="🌱" 
              label="Impact" 
              value="1,247" 
              subtext="trees planted"
              color="from-green-400 to-emerald-500"
              trend={trends[2]}
              isActive={activeTrend === 2}
            />
          </div>
        </div>
        
        {/* Enhanced Additional Details Row */}
        <div className="flex flex-col md:flex-row justify-between items-center h-16 md:h-14 text-xs md:text-sm">
          {/* Enhanced Stats with Icons */}
          <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-8 lg:space-x-16 text-white/80 w-full md:w-auto">
            {/* Conservation Details */}
            <div className="flex items-center justify-center md:justify-start space-x-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <span className="text-emerald-300 text-lg">🌿</span>
              <div>
                <div className="text-xs md:text-sm font-medium">89 wildlife protected</div>
                <div className="text-xs text-emerald-300">+5 this week</div>
              </div>
            </div>
            
            {/* Community Stats */}
            <div className="flex items-center justify-center md:justify-start space-x-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <span className="text-blue-300 text-lg">👥</span>
              <div>
                <div className="text-xs md:text-sm font-medium">2,341 community members</div>
                <div className="text-xs text-blue-300">+23 today</div>
              </div>
            </div>
            
            {/* Learning Progress */}
            <div className="flex items-center justify-center md:justify-start space-x-2 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <span className="text-yellow-300 text-lg">📚</span>
              <div>
                <div className="text-xs md:text-sm font-medium">45 lessons completed</div>
                <div className="text-xs text-yellow-300">+2 today</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Quick Actions */}
          <div className="flex space-x-3 md:space-x-4 mt-3 md:mt-0">
            <button className="px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 rounded-full text-emerald-200 text-xs font-medium transition-all duration-300 border border-emerald-400/30 hover:scale-105 animate-fade-in shadow-lg hover:shadow-emerald-500/25" style={{ animationDelay: '1.1s' }}>
              <span className="hidden sm:inline">View Progress</span>
              <span className="sm:hidden">Progress</span>
            </button>
            <button className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 rounded-full text-blue-200 text-xs font-medium transition-all duration-300 border border-blue-400/30 hover:scale-105 animate-fade-in shadow-lg hover:shadow-blue-500/25" style={{ animationDelay: '1.3s' }}>
              <span className="hidden sm:inline">Join Community</span>
              <span className="sm:hidden">Join</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 