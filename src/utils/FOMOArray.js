class FOMOArray extends Array {
  constructor(x = []) {
    super(x);
  }

  /**
   * shuffle
   * @returns
   */
  shuffle() {
    let i = this.length - 1;
    let temp, r;
    while (i > 0) {
      r = Math.random(0, i, 0);
      i -= 1;
      temp = this[i];
      this[i] = this[r];
      this[r] = temp;
    }
    return this;
  }

  /**
   * storeRandom
   * @param {*} arr
   */
  storeRandom(arr) {
    arr.randomStore = [];
  }

  /**
   * random
   * @param {*} range
   * @returns
   */
  random(range) {
    let value = Math.random(0, this.length - 1);
    if (arguments.length && !this.randomStore) Array.storeRandom(this);
    if (!this.randomStore) return this[value];
    if (range > this.length - 1) range = this.length;
    if (range > 1) {
      while (!!~this.randomStore.indexOf(value))
        if ((value += 1) > this.length - 1) value = 0;
      this.randomStore.push(value);
      if (this.randomStore.length >= range) this.randomStore.shift();
    }
    return this[value];
  }

  /**
   * remove
   * @param {*} element
   * @returns
   */
  remove(element) {
    if (!this.indexOf) return;
    const index = this.indexOf(element);
    if (!!~index) return this.splice(index, 1);
  }

  /**
   * last
   * @returns
   */
  last() {
    return this[this.length - 1];
  }
}
