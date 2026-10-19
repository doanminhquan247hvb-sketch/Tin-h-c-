/**
 * Web Audio API synthesizer for realistic mechanical keyboard click sounds
 * Generates organic micro-clicks without needing external audio files.
 */

/**
 * Web Audio API synthesizer for realistic mechanical keyboard click sounds
 * Generates organic micro-clicks without needing external audio files.
 * Enhanced with Gentle / Soft mode for comfortable, soothing study sessions.
 */

import { SoundSoftness, TypingSpeed } from '../types';

let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let currentSoftness: SoundSoftness = 'gentle'; // Default to gentle as requested
let currentTypingSpeed: TypingSpeed = 'normal';
let hasUserInteracted = false;

// Listen to first user gesture before activating Web Audio API
if (typeof window !== 'undefined') {
  const markUserInteraction = () => {
    hasUserInteracted = true;
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    window.removeEventListener('pointerdown', markUserInteraction);
    window.removeEventListener('keydown', markUserInteraction);
    window.removeEventListener('touchstart', markUserInteraction);
  };
  window.addEventListener('pointerdown', markUserInteraction, { passive: true });
  window.addEventListener('keydown', markUserInteraction, { passive: true });
  window.addEventListener('touchstart', markUserInteraction, { passive: true });
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (enabled && typeof window !== 'undefined') {
    hasUserInteracted = true;
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundSoftness(softness: SoundSoftness) {
  currentSoftness = softness;
}

export function getSoundSoftness(): SoundSoftness {
  return currentSoftness;
}

export function setTypingSpeed(speed: TypingSpeed) {
  currentTypingSpeed = speed;
}

export function getTypingSpeed(): TypingSpeed {
  return currentTypingSpeed;
}

export function playMechanicalKeyClick(softnessOverride?: SoundSoftness, speedOverride?: TypingSpeed) {
  if (!soundEnabled || !hasUserInteracted) return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
      return;
    }

    const t = audioCtx.currentTime;
    const mode = softnessOverride || currentSoftness;
    const speed = speedOverride || currentTypingSpeed;

    // Tuning parameters according to softness & typing speed
    let volumeMult = 0.035; // Gentle default
    let filterFreq = 1600;  // Softer bandpass
    let qFactor = 2.0;
    let thudFreq = 110;
    let thudVolume = 0.03;

    if (speed === 'slow') {
      // Slower, deeper, more deliberate key stroke
      thudFreq = 95;
      filterFreq *= 0.9;
    } else if (speed === 'fast') {
      // Faster, crisp, rapid-fire response
      thudFreq = 135;
      filterFreq *= 1.15;
      volumeMult *= 0.9;
    }

    if (mode === 'whisper') {
      volumeMult *= 0.55;
      filterFreq = 1200;
      qFactor = 1.5;
      thudFreq = 90;
      thudVolume = 0.015;
    } else if (mode === 'normal') {
      volumeMult *= 1.8;
      filterFreq = 2500;
      qFactor = 3.5;
      thudFreq = 140;
      thudVolume = 0.06;
    }

    // Primary gentle noise burst (soft key contact)
    const bufferSize = Math.floor(audioCtx.sampleRate * 0.012); // 12ms
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass'; // lowpass creates much smoother, gentle, softer tone
    noiseFilter.frequency.setValueAtTime(filterFreq + (Math.random() * 200 - 100), t);
    noiseFilter.Q.setValueAtTime(qFactor, t);

    const noiseGain = audioCtx.createGain();
    const peakGain = volumeMult + Math.random() * 0.008;
    noiseGain.gain.setValueAtTime(peakGain, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    // Warm, soft low tap (pleasant bottom out)
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();

    osc.type = 'sine'; // sine wave is much gentler than triangle
    osc.frequency.setValueAtTime(thudFreq + Math.random() * 15, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.025);

    oscGain.gain.setValueAtTime(thudVolume, t);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);

    noise.start(t);
    osc.start(t);

    noise.stop(t + 0.02);
    osc.stop(t + 0.03);
  } catch {
    // Ignore audio autoplay policy errors gracefully
  }
}
