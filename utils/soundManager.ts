import { CDN_ASSETS } from './cloudflare-cdn';

export class SoundManager {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private audioDataCache: Map<string, ArrayBuffer> = new Map(); // Cache raw audio data
  private bearSource: AudioBufferSourceNode | null = null;
  private ambientSource: AudioBufferSourceNode | null = null;
  private isEnabled = false;

  constructor() {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }

  private initAudioContext(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  enable(): void {
    if (!this.isInitialized && typeof window !== 'undefined') {
      this.initAudioContext();
    }
    
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
    this.stopAllSounds();
  }

  private async fetchAudioData(url: string): Promise<ArrayBuffer | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.arrayBuffer();
    } catch (error) {
      console.warn(`Failed to fetch audio from ${url}:`, error);
      return null;
    }
  }

  private async decodeAudioData(arrayBuffer: ArrayBuffer): Promise<AudioBuffer | null> {
    if (!this.audioContext) {
      console.warn('AudioContext not available for decoding');
      return null;
    }

    try {
      return await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.warn('Failed to decode audio data:', error);
      return null;
    }
  }

  async preloadAudio(): Promise<void> {
    if (typeof window === 'undefined') return;

    const audioAssets = Object.entries(CDN_ASSETS).filter(([_, asset]) => asset.type === 'audio');
    
    console.log('🔊 Starting audio preload...');
    console.log('📁 Audio assets to load:', audioAssets.map(([key, asset]) => `${key}: ${asset.localPath}`));
    
    for (const [key, asset] of audioAssets) {
      console.log(`🎵 Loading ${key} from ${asset.localPath}...`);
      
      // Try local path first in development
      let audioData = await this.fetchAudioData(asset.localPath);
      
      if (!audioData && asset.fallbackPath) {
        console.log(`🔄 Trying fallback for ${key}: ${asset.fallbackPath}`);
        audioData = await this.fetchAudioData(asset.fallbackPath);
      }
      
      if (audioData) {
        this.audioDataCache.set(key, audioData);
        console.log(`✅ Preloaded audio data for ${key} (${audioData.byteLength} bytes)`);
      } else {
        console.log(`❌ Failed to load audio for ${key}`);
      }
    }
    
    console.log(`🎵 Audio preload complete. Cached ${this.audioDataCache.size} audio files.`);
  }

  private async getOrDecodeAudio(key: string): Promise<AudioBuffer | null> {
    console.log(`🔍 Getting/decoding audio for ${key}...`);
    
    // Check if already decoded
    if (this.audioBuffers.has(key)) {
      console.log(`✅ Found cached audio buffer for ${key}`);
      return this.audioBuffers.get(key)!;
    }

    // Check if we have raw data to decode
    const audioData = this.audioDataCache.get(key);
    if (audioData) {
      console.log(`🔄 Decoding audio data for ${key} (${audioData.byteLength} bytes)...`);
      const audioBuffer = await this.decodeAudioData(audioData);
      if (audioBuffer) {
        this.audioBuffers.set(key, audioBuffer);
        console.log(`✅ Successfully decoded audio for ${key}`);
        return audioBuffer;
      } else {
        console.log(`❌ Failed to decode audio for ${key}`);
      }
    } else {
      console.log(`❌ No audio data found for ${key}`);
    }

    return null;
  }

  private async playCustomAudio(key: string, volume: number = 1.0): Promise<boolean> {
    if (!this.isEnabled || !this.audioContext) {
      console.log(`🔇 Cannot play ${key}: AudioContext not ready`);
      return false;
    }

    const audioBuffer = await this.getOrDecodeAudio(key);
    if (!audioBuffer) {
      console.log(`❌ No audio buffer found for ${key}`);
      return false;
    }

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      
      source.start();
      console.log(`🎵 Playing custom audio: ${key} at volume ${volume}`);
      return true;
    } catch (error) {
      console.warn(`Failed to play custom audio ${key}:`, error);
      return false;
    }
  }

  createAmbientSound(): void {
    if (!this.isEnabled || !this.audioContext) return;

    console.log('🌬️ Creating ambient sound...');
    console.log('📊 Available audio buffers:', Array.from(this.audioBuffers.keys()));

    // Try custom ambient sound first
    this.playCustomAudio('ambientWind', 0.3).then(success => {
      if (success) {
        console.log('✅ Custom ambient sound played');
        return;
      }
      return this.playCustomAudio('arcticAmbience', 0.3);
    }).then(success => {
      if (success) {
        console.log('✅ Custom ambient sound played');
        return;
      }
      
      console.log('🔄 Falling back to generated ambient sound');
      // Fallback to generated sound
      try {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, this.audioContext!.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext!.currentTime + 2);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext!.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 2);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);
        
        this.ambientSource = oscillator as any;
        oscillator.start();
        oscillator.stop(this.audioContext!.currentTime + 2);
        console.log('🎵 Generated ambient sound played');
      } catch (error) {
        console.warn('Failed to create ambient sound:', error);
      }
    });
  }

  createBearSound(): void {
    if (!this.isEnabled || !this.audioContext) return;

    console.log('🐻 Creating bear sound...');
    console.log('📊 Available audio buffers:', Array.from(this.audioBuffers.keys()));

    // Try custom bear sounds first
    this.playCustomAudio('bearGrowl', 0.5).then(success => {
      if (success) {
        console.log('✅ Custom bear sound played');
        return;
      }
      return this.playCustomAudio('bearRoar', 0.5);
    }).then(success => {
      if (success) {
        console.log('✅ Custom bear sound played');
        return;
      }
      
      console.log('🔄 Falling back to generated bear sound');
      // Fallback to generated sound
      try {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(80, this.audioContext!.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, this.audioContext!.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext!.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);
        
        this.bearSource = oscillator as any;
        oscillator.start();
        oscillator.stop(this.audioContext!.currentTime + 0.5);
        console.log('🎵 Generated bear sound played');
      } catch (error) {
        console.warn('Failed to create bear sound:', error);
      }
    });
  }

  stopAllSounds(): void {
    if (this.bearSource) {
      try {
        this.bearSource.stop();
      } catch (error) {
        // Source might already be stopped
      }
      this.bearSource = null;
    }
    
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch (error) {
        // Source might already be stopped
      }
      this.ambientSource = null;
    }
  }

  isAudioLoaded(): boolean {
    return this.audioDataCache.size > 0;
  }
} 