"use client"

import { GlobalNavigation } from "@/components/ui/global-navigation"
import { useNavigation } from "@/hooks/useNavigation"

export function NavigationWrapper() {
  const { regions, activeRegion, handleRegionChange } = useNavigation()
  
  return (
    <GlobalNavigation
      regions={regions}
      activeRegion={activeRegion}
      onRegionChange={handleRegionChange}
    />
  )
} 