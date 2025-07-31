'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { SoundManager } from '@/utils/soundManager';

interface SoundSystem {
  enable: () => void;
  disable: () => void;
  playAmbientSound: () => void;
  playBearSound: () => void;
  stopAllSounds: () => void;
  preloadAudio: () => Promise<void>;
  isAudioLoaded: () => boolean;
}

export function useSoundSystem(): SoundSystem {
  const soundManagerRef = useRef<SoundManager | null>(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  // Initialize sound manager
  useEffect(() => {
    if (typeof window !== 'undefined' && !soundManagerRef.current) {
      soundManagerRef.current = new SoundManager();
    }
  }, []);

  // Preload audio on mount
  useEffect(() => {
    const preloadAudio = async () => {
      if (soundManagerRef.current) {
        await soundManagerRef.current.preloadAudio();
        setIsAudioLoaded(soundManagerRef.current.isAudioLoaded());
      }
    };
    preloadAudio();
  }, []);

  const initializeAudio = useCallback(() => {
    if (soundManagerRef.current && !isAudioInitialized) {
      soundManagerRef.current.enable();
      setIsAudioInitialized(true);
    }
  }, [isAudioInitialized]);

  const enable = useCallback(() => {
    if (soundManagerRef.current) {
      soundManagerRef.current.enable();
    }
  }, []);

  const disable = useCallback(() => {
    if (soundManagerRef.current) {
      soundManagerRef.current.disable();
    }
  }, []);

  const playAmbientSound = useCallback(() => {
    if (soundManagerRef.current) {
      initializeAudio();
      soundManagerRef.current.createAmbientSound();
    }
  }, [initializeAudio]);

  const playBearSound = useCallback(() => {
    if (soundManagerRef.current) {
      initializeAudio();
      soundManagerRef.current.createBearSound();
    }
  }, [initializeAudio]);

  const stopAllSounds = useCallback(() => {
    if (soundManagerRef.current) {
      soundManagerRef.current.stopAllSounds();
    }
  }, []);

  const preloadAudio = useCallback(async () => {
    if (soundManagerRef.current) {
      await soundManagerRef.current.preloadAudio();
      setIsAudioLoaded(soundManagerRef.current.isAudioLoaded());
    }
  }, []);

  const isAudioLoadedCallback = useCallback(() => {
    return soundManagerRef.current?.isAudioLoaded() || false;
  }, []);

  return {
    enable,
    disable,
    playAmbientSound,
    playBearSound,
    stopAllSounds,
    preloadAudio,
    isAudioLoaded: isAudioLoadedCallback,
  };
} 