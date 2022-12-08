import { readBasicInput } from "../helperFunctions.ts";

const heights = readBasicInput()
  .split("\n")
  .map((row) =>
    row
      .split("")
      .map((str) => Number(str))
  );

function treeIsVisible(
  height: number,
  y: number,
  x: number,
  maxX: number,
  maxY: number,
): boolean {
  let left = true;
  let right = true;
  let up = true;
  let down = true;

  let counter = x;
  while (counter > 0) {
    const otherTreeHeight = heights[y][counter - 1];
    if (otherTreeHeight >= height) {
      left = false;
      break;
    }
    counter--;
  }
  counter = x;
  while (counter < maxX) {
    const otherTreeHeight = heights[y][counter + 1];
    if (otherTreeHeight >= height) {
      right = false;
      break;
    }
    counter++;
  }
  counter = y;
  while (counter > 0) {
    const otherTreeHeight = heights[counter - 1][x];
    if (otherTreeHeight >= height) {
      up = false;
      break;
    }
    counter--;
  }
  counter = y;
  while (counter < maxY) {
    const otherTreeHeight = heights[counter + 1][x];
    if (otherTreeHeight >= height) {
      down = false;
      break;
    }
    counter++;
  }
  return left || right || up || down;
}

function treeIsEdge(x: number, y: number, maxY: number, maxX: number) {
  return x === 0 ||
    x === maxY ||
    y === 0 ||
    y === maxX;
}

const maxY = heights.length - 1;
const maxX = heights[0].length - 1;

let visible = 0;
for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
    const treeHeight = heights[y][x];
    if (treeIsEdge(y, x, maxY, maxX)) {
      visible++;
    } else if (treeIsVisible(treeHeight, y, x, maxY, maxX)) {
      visible++;
    }
  }
}

console.log(visible);
