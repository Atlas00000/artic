import { Mountain, TreePine, Waves, Snowflake, Globe } from "lucide-react"
import type { Region } from "@/components/ui/global-navigation"

export const regions: Region[] = [
  {
    id: "arctic",
    name: "Arctic Region",
    description: "Polar bears and arctic wildlife",
    icon: Snowflake,
    isActive: true
  },
  {
    id: "alpine",
    name: "Alpine Mountains",
    description: "Mountain goats and alpine animals",
    icon: Mountain
  },
  {
    id: "forest",
    name: "Boreal Forest",
    description: "Wolves and forest creatures",
    icon: TreePine
  },
  {
    id: "coastal",
    name: "Coastal Waters",
    description: "Marine life and seabirds",
    icon: Waves
  },
  {
    id: "global",
    name: "Global Explorer",
    description: "Worldwide wildlife discovery",
    icon: Globe
  }
] 