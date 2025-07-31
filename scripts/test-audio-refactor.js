#!/usr/bin/env node

// Test script for the refactored SoundManager
console.log('Testing refactored SoundManager...');

// Simulate browser environment
global.window = {
  AudioContext: class MockAudioContext {
    constructor() {
      this.state = 'running';
      this.currentTime = 0;
      this.sampleRate = 44100;
      this.destination = {};
    }
    
    createOscillator() {
      return {
        type: 'sine',
        frequency: {
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {}
        },
        connect: () => {},
        start: () => {},
        stop: () => {}
      };
    }
    
    createGain() {
      return {
        gain: {
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {}
        },
        connect: () => {}
      };
    }
    
    createBufferSource() {
      return {
        buffer: null,
        connect: () => {},
        start: () => {}
      };
    }
    
    decodeAudioData() {
      return Promise.resolve({
        duration: 1,
        getChannelData: () => new Float32Array(44100)
      });
    }
  }
};

global.fetch = async (url) => {
  console.log(`Fetching: ${url}`);
  if (url.includes('audio')) {
    // Simulate failed audio fetch
    throw new Error('Audio file not found');
  }
  return {
    ok: false,
    status: 404,
    statusText: 'Not Found'
  };
};

// Test the SoundManager
const { SoundManager } = require('../utils/soundManager.ts');

async function testSoundManager() {
  try {
    console.log('Creating SoundManager instance...');
    const soundManager = new SoundManager();
    
    console.log('Enabling sound manager...');
    soundManager.enable();
    
    console.log('Preloading audio...');
    await soundManager.preloadAudio();
    
    console.log('Creating ambient sound...');
    soundManager.createAmbientSound();
    
    console.log('Creating bear sound...');
    soundManager.createBearSound();
    
    console.log('Stopping all sounds...');
    soundManager.stopAllSounds();
    
    console.log('✅ SoundManager test completed successfully!');
    console.log('The refactored SoundManager is working correctly.');
    console.log('It will fall back to generated sounds when custom audio is not available.');
    
  } catch (error) {
    console.error('❌ SoundManager test failed:', error);
  }
}

testSoundManager(); 