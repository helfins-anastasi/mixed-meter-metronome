class Rhythm {
  constructor(tempo = 120, timeSignature = new TimeSignature()) {
    this.tempo = tempo;
    this.timeSignature = timeSignature;
  }

  get beats() {
    if (this.timeSignature.isCompound()) {
      return this.timeSignature.top / 3;
    }
    return this.timeSignature.top;
  }

  get tickInterval() {
    return Math.round((60. / this.tempo) * 1000);
  }

  toString() {
    return "tempo:"+this.tempo+"bpm, time signature: "+this.timeSignature.toString();
  }
}
