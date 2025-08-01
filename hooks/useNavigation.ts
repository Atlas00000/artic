import { useState, useCallback } from "react"
import { regions } from "@/data/regions"

export function useNavigation() {
  const [activeRegion, setActiveRegion] = useState<string>("arctic")

  const handleRegionChange = useCallback((regionId: string) => {
    setActiveRegion(regionId)
    // Here you could add additional logic like:
    // - Analytics tracking
    // - Route changes
    // - Content updates
    // - API calls to load region-specific data
  }, [])

  const getActiveRegion = useCallback(() => {
    return regions.find(region => region.id === activeRegion)
  }, [activeRegion])

  return {
    regions,
    activeRegion,
    handleRegionChange,
    getActiveRegion
  }
} 