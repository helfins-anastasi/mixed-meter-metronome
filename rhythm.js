class Rhythm {
  constructor(metronome, indexInList, nextElement) {
    this.divId = Rhythm.createDivId();
    this.indexInList = indexInList;
    this.metronome = metronome;
    this.tempo = 120;
    this.tempoUnit = 0.25; /* portion of a whole note */

    this.addRhythmDivToPage(nextElement);
    this.watchTempo();

    this.timeSignature = new TimeSignature(this.getDiv.bind(this));
    this.timeSignature.onchange = this.timeSignatureChanged.bind(this);

    this.playBeatDivision = false;
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
    if (!this.playBeatDivision)
      return "beat";
    return tick % this.beatDivision === 0 ? "beat" : "beat division";
  }

  timeSignatureChanged(oldValIsCompound, newVal) {
    if (!oldValIsCompound && newVal.isCompound()) {
      this.beatDivisionCheckbox.checked = true;
    }
  }

  toString() {
    return "tempo:"+this.tempo+"bpm, time signature: "+this.timeSignature.toString();
  }

  updateTempo() {
    this.tempoUnit = this.tempoUnitDropdown.value;
    this.playBeatDivision = this.beatDivisionCheckbox.checked;

    this.tempoInput.value = this.tempoInput.value.replace(/[^0-9]/g, '');
    if (this.tempoInput.value == 0 || this.tempoInput.value > 400)
      this.tempoInput.value = this.tempo;  // Reset the text field.
    else
      this.tempo = this.tempoInput.value;  // Update the tempo.

    this.metronome.tempoChanged(this.indexInList);
  }

  watchTempo() {
    this.beatDivisionCheckbox.onchange = this.updateTempo.bind(this);
    this.tempoInput.onchange = this.updateTempo.bind(this);
    this.tempoUnitDropdown.onchange = this.updateTempo.bind(this);
  }

  get beatDivision() { return this.timeSignature.isCompound() ? 3 : 2; }
  get tempoInput() { return this.getDiv().getElementsByClassName('tempo')[0]; }
  get tempoUnitDropdown() { return this.getDiv().getElementsByClassName('tempo-unit')[0]; }
  get beatDivisionCheckbox() { return this.getDiv().getElementsByClassName('beat-division')[0]; }
  get ticksPerMeasure() { return this.timeSignature.getTicks(this.playBeatDivision); }
  get tickInterval() {
    const measuresPerMinute = this.tempo * this.tempoUnit / (this.timeSignature.top / this.timeSignature.bottom); 
    const ticksPerMinute = measuresPerMinute * this.ticksPerMeasure;
    return Math.round((60. / ticksPerMinute) * 1000); 
  }

  static createDivId() { return 'rhythm' + Rhythm.nextUID++; }
}

Rhythm.nextUID = 1;
