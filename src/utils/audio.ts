// Web Audio API Indian Festive Ambient Music Synthesizer
// Produces a peaceful meditative Tanpura drone + gentle Sitar/Bansuri festive melody
// 100% copyright-free, zero network requests, instant playback, mobile battery efficient

class FestiveAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timer: number | null = null;
  private droneNodes: OscillatorNode[] = [];

  // Raag Yaman / Bhupali auspicious scale frequencies (in Hz)
  // Sa (D3), Re (E3), Ga (F#3), Pa (A3), Dha (B3), Sa' (D4), Re' (E4), Ga' (F#4)
  private melodyNotes: number[] = [
    146.83, // D3 (Sa)
    164.81, // E3 (Re)
    185.00, // F#3 (Ga)
    220.00, // A3 (Pa)
    246.94, // B3 (Dha)
    293.66, // D4 (Sa')
    329.63, // E4 (Re')
    369.99, // F#4 (Ga')
    440.00, // A4 (Pa')
    587.33, // D5 (High Sa)
  ];

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  public async start(): Promise<boolean> {
    if (this.isPlaying) return true;
    this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    this.startDrone();
    this.startMelodyLoop();
    return true;
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    // Stop drone
    this.droneNodes.forEach((node) => {
      try {
        node.stop();
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.droneNodes = [];

    // Stop melody loop
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Tanpura Drone: Sa (146.83), Pa (220), Sa' (293.66)
    const droneFreqs = [146.83, 220.0, 293.66];

    droneFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft warm harmonics
      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter for warm organic resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.droneNodes.push(osc);
    });
  }

  private startMelodyLoop() {
    let step = 0;
    // Pleasant auspicious chime progression
    const progression = [0, 2, 3, 5, 4, 3, 2, 5, 6, 7, 6, 5, 3, 2, 0];

    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const noteIdx = progression[step % progression.length];
      const freq = this.melodyNotes[noteIdx];
      this.playChime(freq);

      step++;
    };

    // Play first note immediately, then every 950ms
    playNextNote();
    this.timer = window.setInterval(playNextNote, 950);
  }

  private playChime(freq: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    // Bell / Sitar pluck envelope: rapid attack, gentle exponential decay
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.7);
  }
}

export const festiveAudio = new FestiveAudioSynthesizer();
