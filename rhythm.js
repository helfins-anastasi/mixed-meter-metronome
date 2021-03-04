class Rhythm {
  constructor(metronome, nextElement) {
    this.divId = Rhythm.createDivId();
    this.metronome = metronome;
    this.addRhythmDivToPage(nextElement);
    this.watchTempo();

    this.tempo = 120;
    this.timeSignature = new TimeSignature(this.getDiv.bind(this));
  }

  addRhythmDivToPage(nextElement) {
    const template = document.getElementById('rhythm-template');
    const div = document.createElement('DIV');
    div.appendChild(document.importNode(template.content, true));
    div.className = 'rhythm';
    div.id = this.divId;

    document.body.insertBefore(div, nextElement);
  }

  getDiv() {
    return document.getElementById(this.divId);
  }

  getStrengthForTick(tick) {
    if (tick === 0)
      return "downbeat";
    if (this.timeSignature.isCompound())
      return tick % 3 === 0 ? "beat" : "beat division";
    else
      return "beat";
  }

  toString() {
    return "tempo:"+this.tempo+"bpm, time signature: "+this.timeSignature.toString();
  }

  updateTempo() {
    this.tempoInput.value = this.tempoInput.value.replace(/[^0-9]/g, '');
    if (this.tempoInput.value == 0 || this.tempoInput.value > 400)
      this.tempoInput.value = this.tempo;  // Reset the text field.
    else
      this.tempo = this.tempoInput.value;  // Update the tempo.

    this.metronome.tempoChanged();
  }

  watchTempo() {
    this.tempoInput.onchange = this.updateTempo.bind(this);
  }

  get tempoInput() { return this.getDiv().getElementsByClassName('tempo')[0]; }
  get ticksPerMeasure() { return this.timeSignature.top; }
  get tickInterval() { return Math.round((60. / this.tempo) * 1000); }

  static createDivId() { return 'rhythm' + Rhythm.nextUID++; }
}

Rhythm.nextUID = 1;
