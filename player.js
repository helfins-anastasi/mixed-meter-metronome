/** Handles playing the audible clicks of the metronome. */
class Player {
  constructor(metronome) {
    this.metronome = metronome;
    this.duration = 0.02;
    this.currentTick = -1;
  }

  start() {
    console.log('Start! ' + this.rhythm.toString());
    this.tick();
    this.updateInterval();
  }

  stop() {
    console.log('Stop!');
    if (this.interval) window.clearInterval(this.interval);
    this.interval = null;
    this.currentTick = -1;
  }

  tick() {
    console.log('tick!');
    this.currentTick = (this.currentTick + 1) % this.rhythm.ticksPerMeasure;

    const oscillator = this.context.createOscillator();
    oscillator.type = 'triangle';

    const strength = this.rhythm.getStrengthForTick(this.currentTick);
    if (strength === "downbeat") oscillator.frequency.value = 2500;
    else if (strength === "beat") oscillator.frequency.value = 2000;
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
  get rhythm() { return this.metronome.rhythm; }
}
