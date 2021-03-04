/** Top-level class. Handles I/O-type things and coordination. */
class Metronome {
  constructor() {
    this.rhythms = [new Rhythm(this, 0, this.addRhythmButton)];
    this.player = new Player(this);

    this.addRhythmButton.onclick = this.addRhythm.bind(this);
    this.startButton.onclick = this.start.bind(this);
    this.stopButton.onclick = this.stop.bind(this);
  }

  addRhythm() {
    this.rhythms.push(new Rhythm(this, this.rhythms.length, this.addRhythmButton));
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

  tempoChanged(rhythmIndex) {
    this.player.tempoChanged(rhythmIndex);
  }

  get addRhythmButton() { return document.getElementById('add-rhythm'); }
  get startButton() { return document.getElementById('start'); }
  get stopButton() { return document.getElementById('stop'); }
}

window.metronome = new Metronome();
