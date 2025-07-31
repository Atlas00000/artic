import { useState, useCallback, useEffect } from 'react'
import { soundManager } from '@/utils/soundManager'

interface SoundSystem {
  isSoundEnabled: boolean
  toggleSound: () => void
  playAmbientSound: () => void
  playBearSound: () => void
  stopAllSounds: () => void
}

export const useSoundSystem = (): SoundSystem => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)

  // Initialize sound manager
  useEffect(() => {
    // Enable sound manager on mount
    soundManager.enable()
    
    return () => {
      soundManager.stopAll()
    }
  }, [])

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const newState = !prev
      
      if (newState) {
        soundManager.enable()
      } else {
        soundManager.disable()
      }
      
      return newState
    })
  }, [])

  const playAmbientSound = useCallback(() => {
    if (isSoundEnabled) {
      soundManager.playAmbient()
    }
  }, [isSoundEnabled])

  const playBearSound = useCallback(() => {
    if (isSoundEnabled) {
      soundManager.playBearSound()
    }
  }, [isSoundEnabled])

  const stopAllSounds = useCallback(() => {
    soundManager.stopAll()
  }, [])

  return {
    isSoundEnabled,
    toggleSound,
    playAmbientSound,
    playBearSound,
    stopAllSounds
  }
} 