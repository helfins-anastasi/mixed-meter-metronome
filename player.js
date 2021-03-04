/** Handles playing the audible clicks of the metronome. */
class Player {
  constructor(metronome) {
    this.metronome = metronome;
    this.duration = 0.02;
    this.currentTick = -1;
    this.currentRhythm = 0;
  }

  start() {
    console.log('Start ' + this.rhythm.toString());
    this.tick();
    this.updateInterval();
  }

  stop() {
    if (this.interval) window.clearInterval(this.interval);
    this.interval = null;
    this.currentTick = -1;
  }

  tempoChanged(rhythmIndex) {
    if (this.interval && rhythmIndex === this.currentRhythm) this.updateInterval();
  }

  tick() {
    this.currentTick = this.currentTick + 1;
    if (this.currentTick == this.rhythm.ticksPerMeasure) {
      this.currentRhythm = (this.currentRhythm + 1) % this.metronome.rhythms.length;
      this.updateInterval();
      console.log('current rhythm: ' + this.currentRhythm);
      console.log('ticks per measure: ' + this.rhythm.ticksPerMeasure);
      this.currentTick = 0;
    }
    console.log('current tick: ' + this.currentTick);

    const oscillator = this.context.createOscillator();
    oscillator.type = 'triangle';

    const strength = this.rhythm.getStrengthForTick(this.currentTick);
    if (strength === 'downbeat') oscillator.frequency.value = 2500;
    else if (strength === 'beat') oscillator.frequency.value = 2000;
    else oscillator.frequency.value = 1500;

    oscillator.connect(this.context.destination);
    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + this.duration);
  }

  updateInterval() {
    if (this.interval) window.clearInterval(this.interval);
    this.interval = window.setInterval(this.tick.bind(this), this.rhythm.tickInterval);
  }

  get context() {
    // TODO: This has different names in different browsers.
    // Determine which is present and construct one of those.
    if (!this.context_) this.context_ = new AudioContext();
    return this.context_;
  }
  get rhythm() { return this.metronome.rhythms[this.currentRhythm]; }
}
