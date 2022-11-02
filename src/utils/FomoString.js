class FOMOString extends String {
  constructor(x = '') {
    super(x);
  }

  /**
   * includes
   * @param {*} str
   * @returns
   */
  includes(str) {
    if (!Array.isArray(str)) return !!~this.indexOf(str);
    for (let i = str.length - 1; i >= 0; i--) {
      if (!!~this.indexOf(str[i])) return true;
    }
    return false;
  }

  /**
   * equals
   * @param {*} str
   * @returns
   */
  equals(str) {
    let compare = String(this);
    if (!Array.isArray(str)) return str === compare;
    for (let i = str.length - 1; i >= 0; i--) {
      if (str[i] === compare) return true;
    }
    return false;
  }

  /**
   * strpos
   * @param {*} str
   * @returns
   */
  strpos(str) {
    console.warn('strpos deprecated: use .includes()');
    return this.includes(str);
  }

  /**
   * clip
   * @param {*} num
   * @param {*} end
   * @returns
   */
  clip(num, end = '') {
    return this.length > num
      ? this.slice(0, Math.max(0, num - end.length)).trim() + end
      : this.slice();
  }

  /**
   * capitalize
   * @returns
   */
  capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  /**
   * replaceAll
   * @param {*} find
   * @param {*} replace
   * @returns
   */
  replaceAll(find, replace) {
    return this.split(find).join(replace);
  }

  /**
   * replaceAt
   * @param {*} index
   * @param {*} replacement
   * @returns
   */
  replaceAt(index, replacement) {
    return (
      this.substr(0, index) +
      replacement +
      this.substr(index + replacement.length)
    );
  }
}
