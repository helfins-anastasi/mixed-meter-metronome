/** Top-level class. Handles I/O-type things and coordination. */
class Metronome {
  constructor() {
    this.rhythm = new Rhythm();
    this.player = new Player(this);

    this.startButton.onclick = this.start.bind(this);
    this.stopButton.onclick = this.stop.bind(this);
    this.tempoInput.onchange = this.updateTempo.bind(this);
    this.timeTopInput.onchange = this.updateTimeSignature.bind(this);
    this.timeBottomInput.onchange = this.updateTimeSignature.bind(this);
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

  updateTimeSignature() {
    // Remove non-numeric characters.
    this.timeTopInput.value = this.timeTopInput.value.replace(/[^0-9]/g, '');
    if (this.timeTopInput.value == 0)  // Yes this is intentionally == not ===
      this.timeTopInput.value = this.rhythm.timeSignature.top;
    else
      this.rhythm.timeSignature.top = this.timeTopInput.value;

    const bottom = this.timeBottomInput.value;
    // Only a few powers of two are valid units.
    if (bottom == 2 || bottom == 4 || bottom == 8 || bottom == 16)
      this.rhythm.timeSignature.bottom = bottom;
    else
      this.timeBottomInput.value = this.rhythm.timeSignature.bottom;
  }

  updateTempo() {
    this.tempoInput.value = this.tempoInput.value.replace(/[^0-9]/g, '');
    if (this.tempoInput.value == 0 || this.tempoInput.value > 400)
      this.tempoInput.value = this.rhythm.tempo;
    else
      this.rhythm.tempo = this.tempoInput.value;

    this.player.updateInterval();
  }

  get startButton() { return document.getElementById('start'); }
  get stopButton() { return document.getElementById('stop'); }
  get tempoInput() { return document.getElementById('tempo'); }
  get timeTopInput() { return document.getElementById('time-top'); }
  get timeBottomInput() { return document.getElementById('time-bottom'); }
}

window.metronome = new Metronome();
