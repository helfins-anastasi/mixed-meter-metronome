class TimeSignature {
  constructor(functionToGetDiv) {
    this.top = 4;
    this.bottom = 4;

    this.getDiv = functionToGetDiv;
    this.watchInputs();
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

  update() {
    // Remove non-numeric characters.
    this.topInput.value = this.topInput.value.replace(/[^0-9]/g, '');
    if (this.topInput.value == 0)  // Yes this is intentionally == not ===
      this.topInput.value = this.top;
    else
      this.top = this.topInput.value;

    const bottom = this.bottomInput.value;
    // Only a few powers of two are valid units.
    if (bottom == 2 || bottom == 4 || bottom == 8 || bottom == 16)
      this.bottom = bottom;
    else
      this.bottomInput.value = this.bottom;
  }

  watchInputs() {
    this.topInput.onchange = this.update.bind(this);
    this.bottomInput.onchange = this.update.bind(this);
  }

  get topInput() { return this.getDiv().getElementsByClassName('time-top')[0]; }
  get bottomInput() { return this.getDiv().getElementsByClassName('time-bottom')[0]; }
}

