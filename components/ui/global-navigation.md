# Global Navigation Component

## Overview

The `GlobalNavigation` component provides a responsive navigation bar with region selection functionality for the Arctic Life application.

## Features

- **Region Selection**: Dropdown menu for selecting different wildlife regions
- **Mobile Responsive**: Collapsible mobile menu for smaller screens
- **Active Region Highlighting**: Visual indicators for the currently selected region
- **Smooth Animations**: CSS transitions and animations for better UX
- **Modular Design**: Reusable component with clear props interface

## Props

```typescript
interface GlobalNavigationProps {
  regions: Region[]           // Array of available regions
  activeRegion?: string       // Currently selected region ID
  onRegionChange?: (regionId: string) => void  // Callback for region changes
  className?: string          // Additional CSS classes
}
```

## Region Interface

```typescript
interface Region {
  id: string                                    // Unique region identifier
  name: string                                 // Display name
  description: string                          // Region description
  icon: React.ComponentType<{ className?: string }>  // Icon component
  isActive?: boolean                           // Active state (optional)
}
```

## Usage

```tsx
import { GlobalNavigation } from "@/components/ui/global-navigation"
import { useNavigation } from "@/hooks/useNavigation"

function App() {
  const { regions, activeRegion, handleRegionChange } = useNavigation()
  
  return (
    <GlobalNavigation
      regions={regions}
      activeRegion={activeRegion}
      onRegionChange={handleRegionChange}
    />
  )
}
```

## Styling

The component uses Tailwind CSS classes and custom animations defined in `globals.css`:

- `nav-slide-in`: Navigation entrance animation
- `dropdown-fade-in`: Dropdown menu fade animation
- `animate-pulse`: Pulsing animation for active indicators
- `animate-spin-slow`: Slow rotation for logo
- `animate-bounce`: Bounce animation on hover

## Mobile Responsiveness

- Desktop: Full navigation with dropdown menus
- Mobile: Hamburger menu with collapsible navigation
- Breakpoint: `md:` (768px and above for desktop)

## Accessibility

- Proper ARIA labels for buttons
- Keyboard navigation support
- Screen reader friendly
- Focus management for dropdowns

## Dependencies

- `@/components/ui/button`: Button component
- `@/lib/utils`: Utility functions (cn)
- `lucide-react`: Icon components
- Tailwind CSS: Styling framework 