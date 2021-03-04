class Rhythm {
  constructor(tempo = 120, timeSignature = new TimeSignature()) {
    this.tempo = tempo;
    this.timeSignature = timeSignature;
  }

  getStrengthForTick(tick) {
    if (tick === 0)
      return "downbeat";
    if (this.timeSignature.isCompound())
      return tick % 3 === 0 ? "beat" : "beat division";
    else
      return "beat";
  }

  get beats() {
    if (this.timeSignature.isCompound())
      return this.timeSignature.top / 3;
    else
      return this.timeSignature.top;
  }

  get ticksPerMeasure() { return this.timeSignature.top; }

  get tickInterval() { return Math.round((60. / this.tempo) * 1000); }

  toString() {
    return "tempo:"+this.tempo+"bpm, time signature: "+this.timeSignature.toString();
  }
}
