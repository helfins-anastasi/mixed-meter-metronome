/** Handles playing the audible clicks of the metronome. */
class Player {
  constructor(rhythm) {
    this.rhythm = rhythm;
    this.duration = 0.02;
    this.beat = -1;
  }

  start() {
    console.log('Start! ' + this.rhythm.toString());
    this.tick();
    this.interval = window.setInterval(this.tick.bind(this), (60 / this.rhythm.bpm) * 1000);
  }

  stop() {
    console.log('Stop!');
    if (this.interval) window.clearInterval(this.interval);
    this.interval = null;
    this.beat = -1;
  }

  tick() {
    console.log('tick!');
    this.beat = (this.beat + 1) % this.rhythm.count;

    const oscillator = this.context.createOscillator();
    oscillator.type = 'triangle';
    if (this.beat === 0 /*downbeat*/) oscillator.frequency.value = 2500;
    else oscillator.frequency.value = 1500;
    oscillator.connect(this.context.destination);
    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + this.duration);
  }

  get context() {
    // TODO: this has different names in different browsers. Determine which is present and construct one of those
    if (!this.context_) this.context_ = new AudioContext();
    return this.context_;
  }  
}
