"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface StatItemProps {
  icon: string
  label: string
  value: string
  subtext: string
  color?: string
  progress?: number
  className?: string
  trend?: { value: string; color: string }
  isActive?: boolean
}

export function StatItem({ 
  icon, 
  label, 
  value, 
  subtext, 
  color = "from-emerald-400 to-teal-500",
  progress,
  className,
  trend,
  isActive = false
}: StatItemProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-105",
      isActive && "scale-110 ring-2 ring-emerald-400/50 shadow-lg",
      className
    )}>
      {/* Icon */}
      <div className={cn(
        "text-xl md:text-2xl lg:text-3xl mb-1 animate-bounce-gentle",
        isActive && "animate-pulse"
      )}>
        {icon}
      </div>
      
      {/* Main Value */}
      <div className="text-sm md:text-lg lg:text-xl font-bold text-white mb-1">
        <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
          {value}
        </span>
      </div>
      
      {/* Label */}
      <div className="text-xs md:text-sm font-medium text-emerald-200 mb-1">
        {label}
      </div>
      
      {/* Subtext */}
      <div className="text-xs text-white/70 mb-1">
        {subtext}
      </div>
      
      {/* Trend Indicator */}
      {trend && (
        <div className={cn(
          "text-xs font-bold animate-fade-in",
          trend.color
        )}>
          {trend.value}
        </div>
      )}
      
      {/* Progress Bar (if provided) */}
      {progress && (
        <div className="w-full mt-1 md:mt-2">
          <div className="w-full bg-white/20 rounded-full h-1">
            <div 
              className={cn(
                "h-1 rounded-full transition-all duration-1000 ease-out",
                color
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-white/60 mt-1">
            {progress}% complete
          </div>
        </div>
      )}
    </div>
  )
} 