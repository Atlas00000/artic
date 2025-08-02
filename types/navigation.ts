import { ComponentType } from "react"

export interface Region {
  id: string
  name: string
  description: string
  icon: ComponentType<{ className?: string }>
  isActive?: boolean
}

export interface GlobalNavigationProps {
  regions: Region[]
  activeRegion?: string
  onRegionChange?: (regionId: string) => void
  className?: string
} 