/** Top-level class. Handles I/O-type things and coordination. */
class Metronome {
  constructor() {
    this.rhythm = new Rhythm();
    this.player = new Player(this.rhythm);

    this.startButton.onclick = this.start.bind(this);
    this.stopButton.onclick = this.stop.bind(this);
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

  get startButton() { return document.getElementById('start'); }
  get stopButton() { return document.getElementById('stop'); }
}

window.metronome = new Metronome();
