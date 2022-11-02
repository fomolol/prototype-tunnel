import * as THREE from 'three';

/**
 * dot
 * @param {*} a
 * @param {*} b
 * @returns
 */
export const dot = (a, b) => {
  return a.x * b.x + a.y * b.y;
};

/**
 * clamp
 * @param {*} x
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const clamp = (x, min, max) => {
  return Math.min(Math.max(x, min), max);
};

/**
 * length
 * @param {*} v
 * @returns
 */
export const length = v => {
  return Math.sqrt(dot(v, v));
};

/**
 * smoothstep
 * @param {*} edge0
 * @param {*} edge1
 * @param {*} x
 * @returns
 */
export const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
};

/**
 * transform
 * Handles converting a number range
 * Example: transform( 328.17, [ 300.77, 559.22 ], [ 1, 10 ] );
 * @param {*} value
 * @param {*} r1
 * @param {*} r2
 * @returns
 */
export const transform = (value, r1, r2) => {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
};

/**
 * distanceToSquared
 * @param {*} param0
 * @param {*} param1
 * @returns
 */
export const distanceToSquared = ({ xA, yA, zA }, { xB, yB, zB }) => {
  return Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2) + Math.pow(zB - zA, 2);
};

/**
 * distanceTo
 * @param {*} a
 * @param {*} b
 * @returns
 */
export const distanceTo = (a, b) => Math.sqrt(distanceToSquared(a, b));

/**
 * linearSpace
 * @param {*} startValue
 * @param {*} endValue
 * @param {*} nPoints
 * @returns
 */
export const linearSpace = (startValue, endValue, nPoints) => {
  const distance = endValue - startValue;
  const step = distance / (nPoints - 1);
  const listOfPoints = [];

  let x = startValue;
  for (let i = 0; i < nPoints; i++) {
    listOfPoints.push(x);

    x += step;
  }

  return listOfPoints;
};

/**
 * clip
 * @param {*} value
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const clip = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * randomBetween
 * @param {*} a
 * @param {*} b
 * @returns
 */
export const randomBetween = (a, b) => Math.random() * (b - a) + a;

/**
 * slew
 * @param {*} param0
 * @returns
 */
export default function slew({
  slewGoingUp,
  slewGoingDown,
  defaultValue,
  slewFactor,
}) {
  let value = defaultValue;

  return sample => {
    if (!slewGoingUp && sample > value) {
      value = sample;
    } else if (!slewGoingDown && sample < value) {
      value = sample;
    } else {
      value = (value * (slewFactor - 1) + sample) / slewFactor;
    }

    return value;
  };
}

/**
 * debounce
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
/**
 * EXAMPLE USAGE
 *
 * export default function ProductInputs({ handleChangeProductName }) {
 *   const debouncedHandler = useCallback(debounce(handleChangeProductName, 200), []);
 *
 *   return (
 *     <TextField
 *       fullWidth
 *       label="Name"
 *       variant="outlined"
 *       size="small"
 *       name="productName"
 *       value={formik.values.productName}
 *       helperText={formik.touched.productName ? formik.errors.productName : ""}
 *       error={formik.touched.productName && Boolean(formik.errors.productName)}
 *       onChange={(e) => {
 *         formik.setFieldValue("productName", e.target.value);
 *         debouncedHandler(e.target.value);
 *       }}
 *     />
 *   );
 * }
 */
export const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Handles converting the mouse pointer to local screen coordinate space.
 * @param {*} pointer
 * @param {*} camera
 * @returns
 */
export const getLocalPosition = (pointer, camera) => {
  var vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
  vector.unproject(camera);
  var dir = vector.sub(camera.position).normalize();
  var distance = -camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  return {
    pos,
    dir,
    distance,
    vector,
  };
};
