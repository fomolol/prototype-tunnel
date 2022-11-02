class FOMOMath extends Math {
  constructor({ ...props }) {
    super(props);
  }

  /**
   * sign
   * @param {*} x
   * @returns
   */
  sign(x) {
    x = +x;
    if (x === 0 || isNaN(x)) return Number(x);
    return x > 0 ? 1 : -1;
  }

  /**
   * round
   * @param {*} value
   * @param {*} precision
   * @returns
   */
  round(value, precision = 0) {
    let p = Math.pow(10, precision);
    return Math._round(value * p) / p;
  }

  /**
   * rand
   * @param {*} min
   * @param {*} max
   * @param {*} precision
   */
  rand(min, max, precision = 0) {
    random(min, max, (precision = 0));
  }

  /**
   * random
   * @param {*} min
   * @param {*} max
   * @param {*} precision
   * @returns
   */
  random(min, max, precision = 0) {
    if (typeof min === 'undefined') return Math._random();
    if (min === max) return min;
    min = min || 0;
    max = max || 1;
    if (precision == 0)
      return Math.floor(Math._random() * (max + 1 - min) + min);
    return Math.round(min + Math._random() * (max - min), precision);
  }

  /**
   * degrees
   * @param {*} radians
   * @returns
   */
  degrees(radians) {
    return radians * (180 / Math.PI);
  }

  /**
   * radians
   * @param {*} degrees
   * @returns
   */
  radians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * clamp
   * @param {*} value
   * @param {*} min
   * @param {*} max
   * @returns
   */
  clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
  }

  /**
   * map
   * @param {*} value
   * @param {*} oldMin
   * @param {*} oldMax
   * @param {*} newMin
   * @param {*} newMax
   * @param {*} isClamp
   * @returns
   */
  map(value, oldMin = -1, oldMax = 1, newMin = 0, newMax = 1, isClamp) {
    range(
      value,
      (oldMin = -1),
      (oldMax = 1),
      (newMin = 0),
      (newMax = 1),
      isClamp,
    );
  }

  /**
   * range
   * @param {*} value
   * @param {*} oldMin
   * @param {*} oldMax
   * @param {*} newMin
   * @param {*} newMax
   * @param {*} isClamp
   * @returns
   */
  range(value, oldMin = -1, oldMax = 1, newMin = 0, newMax = 1, isClamp) {
    const newValue =
      ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
    if (isClamp)
      return Math.clamp(
        newValue,
        Math.min(newMin, newMax),
        Math.max(newMin, newMax),
      );
    return newValue;
  }

  /**
   * mix
   * @param {*} a
   * @param {*} b
   * @param {*} alpha
   * @returns
   */
  mix(a, b, alpha) {
    return a * (1 - alpha) + b * alpha;
  }

  /**
   * step
   * @param {*} edge
   * @param {*} value
   * @returns
   */
  step(edge, value) {
    return value < edge ? 0 : 1;
  }

  /**
   * smoothStep
   * @param {*} min
   * @param {*} max
   * @param {*} value
   * @returns
   */
  smoothStep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  /**
   * fract
   * @param {*} value
   * @returns
   */
  fract(value) {
    return value - Math.floor(value);
  }

  /**
   * lerp
   * @param {*} target
   * @param {*} value
   * @param {*} alpha
   * @param {*} calcHz
   * @returns
   */
  lerp(target, value, alpha, calcHz = true) {
    let hz = window.Render && calcHz ? Render.HZ_MULTIPLIER : 1;
    return value + (target - value) * Math.clamp(alpha * hz, 0, 1);
  }

  /**
   * mod
   * @param {*} value
   * @param {*} n
   * @returns
   */
  mod(value, n) {
    return ((value % n) + n) % n;
  }
}
