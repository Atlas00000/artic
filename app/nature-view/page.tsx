"use client"

import React, { useState, useEffect } from "react"
import { MobileHomepage } from "@/components/homepage/MobileHomepage"
import { DesktopHomepage } from "@/components/homepage/DesktopHomepage"

export default function NatureViewHomepage() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    setIsLoading(false)
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show loading state while determining screen size
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // Render appropriate homepage based on screen size
  return isMobile ? <MobileHomepage /> : <DesktopHomepage />
} 