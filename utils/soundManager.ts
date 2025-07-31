class SoundManager {
  private audioContext: AudioContext | null = null
  private ambientSource: AudioBufferSourceNode | null = null
  private bearSource: AudioBufferSourceNode | null = null
  private isEnabled = true

  constructor() {
    this.initAudioContext()
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported, falling back to HTML5 Audio')
    }
  }

  private async loadAudioBuffer(url: string): Promise<AudioBuffer | null> {
    if (!this.audioContext) return null

    try {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      return await this.audioContext.decodeAudioData(arrayBuffer)
    } catch (error) {
      console.warn(`Failed to load audio: ${url}`, error)
      return null
    }
  }

  private createAmbientSound(): void {
    if (!this.audioContext) return

    // Create a simple ambient sound using oscillators
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()

    // Wind-like sound
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(120, this.audioContext.currentTime + 2)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(200, this.audioContext.currentTime)

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + 1)

    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.start()
    oscillator.stop(this.audioContext.currentTime + 2)

    // Loop the ambient sound
    setInterval(() => {
      if (this.isEnabled) {
        this.createAmbientSound()
      }
    }, 2000)
  }

  private createBearSound(): void {
    if (!this.audioContext) return

    // Create a bear-like sound
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()

    // Low frequency growl
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(40, this.audioContext.currentTime + 0.5)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(150, this.audioContext.currentTime)

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0, this.audioContext.currentTime + 1)

    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.start()
    oscillator.stop(this.audioContext.currentTime + 1)
  }

  enable(): void {
    this.isEnabled = true
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume()
    }
  }

  disable(): void {
    this.isEnabled = false
    if (this.ambientSource) {
      this.ambientSource.stop()
      this.ambientSource = null
    }
    if (this.bearSource) {
      this.bearSource.stop()
      this.bearSource = null
    }
  }

  playAmbient(): void {
    if (this.isEnabled) {
      this.createAmbientSound()
    }
  }

  playBearSound(): void {
    if (this.isEnabled) {
      this.createBearSound()
    }
  }

  stopAll(): void {
    if (this.ambientSource) {
      this.ambientSource.stop()
      this.ambientSource = null
    }
    if (this.bearSource) {
      this.bearSource.stop()
      this.bearSource = null
    }
  }
}

// Create singleton instance
export const soundManager = new SoundManager() 