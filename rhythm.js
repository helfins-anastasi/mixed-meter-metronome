class Rhythm {
  constructor(bpm = 120, count = 4, unit = 4) {
    this.bpm = bpm;
    this.count = count;
    this.unit = unit;
  }

  toString() {
    return "bpm:"+this.bpm+" time signature: "+this.count+"/"+this.unit;
  }
}
