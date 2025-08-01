"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  MapPin, 
  Snowflake, 
  Menu, 
  X, 
  ChevronDown,
  Globe,
  Mountain,
  TreePine,
  Waves
} from "lucide-react"

export interface Region {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
}

interface GlobalNavigationProps {
  regions: Region[]
  activeRegion?: string
  onRegionChange?: (regionId: string) => void
  className?: string
}

export function GlobalNavigation({
  regions,
  activeRegion,
  onRegionChange,
  className
}: GlobalNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)

  const handleRegionSelect = (regionId: string) => {
    onRegionChange?.(regionId)
    setIsRegionDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleRegionDropdown = () => {
    setIsRegionDropdownOpen(!isRegionDropdownOpen)
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 via-cyan-800/95 to-blue-700/95 backdrop-blur-md border-b-2 border-cyan-400/40 shadow-2xl nav-slide-in",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105">
            <div className="relative">
              <Snowflake className="h-8 w-8 text-cyan-300 animate-spin-slow group-hover:animate-bounce" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white drop-shadow-lg flex items-center">
                <span className="text-cyan-300 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  Arctic
                </span>
                <span className="text-white ml-1">Life</span>
                <span className="ml-1 text-lg animate-pulse">❄️</span>
              </h1>
              <p className="text-cyan-200 text-xs font-medium">Polar Wildlife Explorer</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Region Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={toggleRegionDropdown}
                className="flex items-center space-x-2 text-white hover:bg-cyan-600/50 transition-all duration-300"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {regions.find(r => r.id === activeRegion)?.name || "Select Region"}
                </span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isRegionDropdownOpen && "rotate-180"
                )} />
              </Button>

              {/* Region Dropdown */}
              {isRegionDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-md border border-cyan-400/30 rounded-lg shadow-xl overflow-hidden dropdown-fade-in">
                  <div className="py-2">
                    {regions.map((region) => {
                      const IconComponent = region.icon
                      return (
                        <button
                          key={region.id}
                          onClick={() => handleRegionSelect(region.id)}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 hover:bg-cyan-600/30",
                            region.id === activeRegion && "bg-cyan-600/50 border-l-4 border-cyan-300"
                          )}
                        >
                          <IconComponent className="h-5 w-5 text-cyan-300" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">
                              {region.name}
                            </div>
                            <div className="text-xs text-cyan-200">
                              {region.description}
                            </div>
                          </div>
                          {region.id === activeRegion && (
                            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-cyan-600/50 transition-all duration-300"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Explore
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-cyan-600/50 transition-all duration-300"
              >
                <Snowflake className="h-4 w-4 mr-2" />
                Wildlife
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-white hover:bg-cyan-600/50 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-900/95 to-cyan-800/95 backdrop-blur-md border-t border-cyan-400/30 nav-slide-in">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Region Selector */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-cyan-200 mb-2">Select Region</div>
                {regions.map((region) => {
                  const IconComponent = region.icon
                  return (
                    <button
                      key={region.id}
                      onClick={() => handleRegionSelect(region.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-cyan-600/30",
                        region.id === activeRegion && "bg-cyan-600/50 border-l-4 border-cyan-300"
                      )}
                    >
                      <IconComponent className="h-5 w-5 text-cyan-300" />
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white">
                          {region.name}
                        </div>
                        <div className="text-xs text-cyan-200">
                          {region.description}
                        </div>
                      </div>
                      {region.id === activeRegion && (
                        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2 pt-4 border-t border-cyan-400/30">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-cyan-600/50 transition-all duration-300"
                >
                  <MapPin className="h-4 w-4 mr-3" />
                  Explore
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-cyan-600/50 transition-all duration-300"
                >
                  <Snowflake className="h-4 w-4 mr-3" />
                  Wildlife
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isRegionDropdownOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsRegionDropdownOpen(false)
            setIsMobileMenuOpen(false)
          }}
        />
      )}
    </nav>
  )
} 