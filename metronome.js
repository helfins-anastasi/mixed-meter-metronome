/** Top-level class. Handles I/O-type things and coordination. */
class Metronome {
  constructor() {
    this.rhythm = new Rhythm();
    this.player = new Player(this);

    this.startButton.onclick = this.start.bind(this);
    this.stopButton.onclick = this.stop.bind(this);
    this.countInput.onchange = this.updateCount.bind(this);
  }

  start() {
    this.startButton.hidden = true;
    this.stopButton.hidden = false;

    this.player.start();
  }

  stop() {
    this.stopButton.hidden = true;
    this.startButton.hidden = false;

    this.player.stop();
  }

  updateCount() {
    // Remove non-numeric characters.
    this.countInput.value = this.countInput.value.replace(/[^1-9]/g, '');
    this.rhythm.count = this.countInput.value;
  }

  get startButton() { return document.getElementById('start'); }
  get stopButton() { return document.getElementById('stop'); }
  get countInput() { return document.getElementById('count'); }
}

window.metronome = new Metronome();
