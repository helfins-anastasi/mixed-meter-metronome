class Rhythm {
  constructor(bpm = 120, count = 4) {
    this.bpm = bpm;
    this.count = count;
  }

  toString() {
    return "bpm:"+this.bpm+" beat count per measure:"+this.count;
  }
}
