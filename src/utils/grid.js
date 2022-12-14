/**
 * @file grid.js
 */
import * as THREE from 'three';

export const generateGrid = ({
  startingPoint,
  columnPointCount,
  rowPointCount,
  radius,
  columnSpacing,
  rowSpacing,
  evenOddRowOffset,
}) => {
  const points = [];

  const trueColumnSpacing = columnSpacing * radius;
  const trueRowSpacing = rowSpacing * radius;
  const rowOffset = evenOddRowOffset * radius;

  for (let i = 0; i < rowPointCount; i++) {
    const thisRowOffset = (i % 2) * rowOffset;

    for (let j = 0; j < columnPointCount; j++) {
      const point = new THREE.Vector3(
        thisRowOffset + startingPoint.x + j * trueColumnSpacing,
        startingPoint.y - i * trueRowSpacing,
        startingPoint.z,
      );

      points.push(point);
    }
  }

  return points;
};

export const OFFSET_HEXAGONAL = Math.sqrt(3) / 2;
export const SPACING_ROW_HEXAGONAL = 3 / 2;
export const SPACING_COLUMN_HEXAGONAL = Math.sqrt(3);

export const OFFSET_SQUARE = 0;
export const SPACING_ROW_SQUARE = Math.sqrt(2);
export const SPACING_COLUMN_SQUARE = Math.sqrt(2);
