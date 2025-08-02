"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Leaf, Globe, Heart, Mail, Twitter, Facebook, Instagram,
  Github, ExternalLink, Star, Award, TrendingUp, Users
} from "lucide-react"

export function Footer() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <footer className="bg-gradient-to-b from-emerald-900/50 to-teal-900/50 border-t border-white/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Enhanced Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Globe className="h-10 w-10 text-emerald-300 animate-spin-slow" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  Nature View
                </h3>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
                  <span className="text-emerald-300 text-sm font-medium">Premium Wildlife Explorer</span>
                </div>
              </div>
            </div>
            <p className="text-emerald-200 mb-6 max-w-md leading-relaxed">
              Explore wildlife from every corner of the world through interactive 3D experiences. Learn about conservation, 
              discover amazing animals, and become an environmental advocate.
            </p>
            
            {/* Enhanced Social Links */}
            <div className="flex space-x-3 mb-6">
              <Button
                size="sm"
                variant="ghost"
                className="text-emerald-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-emerald-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-emerald-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-emerald-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-emerald-200">
                <Award className="h-4 w-4" />
                <span>5 Regions</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <Users className="h-4 w-4" />
                <span>2,341 Members</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <TrendingUp className="h-4 w-4" />
                <span>150+ Species</span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>Explore</h4>
            <ul className="space-y-3">
              {[
                { icon: Globe, label: "All Regions", delay: 0.3 },
                { icon: Heart, label: "Wildlife Gallery", delay: 0.4 },
                { icon: Leaf, label: "Learning Path", delay: 0.5 },
                { icon: ExternalLink, label: "Conservation", delay: 0.6 }
              ].map((item, index) => (
                <li key={item.label}>
                  <Button
                    variant="ghost"
                    className="text-emerald-200 hover:text-white justify-start p-0 h-auto transition-all duration-300 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${item.delay}s` }}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: Mail, label: "Contact Us", delay: 0.8 },
                { icon: Heart, label: "Support", delay: 0.9 },
                { icon: Globe, label: "Privacy Policy", delay: 1.0 },
                { icon: ExternalLink, label: "Terms of Service", delay: 1.1 }
              ].map((item, index) => (
                <li key={item.label}>
                  <Button
                    variant="ghost"
                    className="text-emerald-200 hover:text-white justify-start p-0 h-auto transition-all duration-300 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${item.delay}s` }}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <p className="text-emerald-200 text-sm">
              © 2024 Nature View. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-pink-300 animate-pulse" />
              <span className="text-emerald-200 text-sm">Made for wildlife conservation</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-emerald-200 text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-200 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 