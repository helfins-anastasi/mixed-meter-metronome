class TimeSignature {
  constructor(top = 4, bottom = 4) {
    this.top = top;
    this.bottom = bottom;
  }

  isSimple() {
    return this.top <= 4;
  }

  isCompound() {
    return this.top % 3 === 0 && this.top > 3;
  }

  // TODO: support complex meter.
  isComplex() {
    return !this.isSimple() && !this.isCompound();
  }

  toString() {
    return this.top + "/" + this.bottom;
  }
}

