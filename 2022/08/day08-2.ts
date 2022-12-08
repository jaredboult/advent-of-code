import { readBasicInput } from "../helperFunctions.ts";

const heights = readBasicInput()
  .split("\n")
  .map((row) =>
    row
      .split("")
      .map((str) => Number(str))
  );

function getScenicScore(
  height: number,
  y: number,
  x: number,
  maxX: number,
  maxY: number,
): number {
  let left = 0;
  let right = 0;
  let up = 0;
  let down = 0;

  let counter = x;
  while (counter > 0) {
    const otherTreeHeight = heights[y][counter - 1];
    if (otherTreeHeight >= height) {
      left++;
      break;
    } else {
      left++;
    }
    counter--;
  }
  counter = x;
  while (counter < maxX) {
    const otherTreeHeight = heights[y][counter + 1];
    if (otherTreeHeight >= height) {
      right++;
      break;
    } else {
      right++;
    }
    counter++;
  }
  counter = y;
  while (counter > 0) {
    const otherTreeHeight = heights[counter - 1][x];
    if (otherTreeHeight >= height) {
      up++;
      break;
    } else {
      up++;
    }
    counter--;
  }
  counter = y;
  while (counter < maxY) {
    const otherTreeHeight = heights[counter + 1][x];
    if (otherTreeHeight >= height) {
      down++;
      break;
    } else {
      down++;
    }
    counter++;
  }
  return left * right * up * down;
}

function treeIsEdge(x: number, y: number, maxY: number, maxX: number) {
  return x === 0 ||
    x === maxY ||
    y === 0 ||
    y === maxX;
}

const maxY = heights.length - 1;
const maxX = heights[0].length - 1;

const scenicScores: number[] = [];
for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
    const treeHeight = heights[y][x];
    if (treeIsEdge(y, x, maxY, maxX)) {
      scenicScores.push(0);
    } else {
      scenicScores.push(getScenicScore(treeHeight, y, x, maxY, maxX));
    }
  }
}
scenicScores.sort((a, b) => b - a);
console.log(scenicScores.shift());
