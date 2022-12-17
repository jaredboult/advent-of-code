import { readInput } from "../helperFunctions.ts";

function solveProblem() {
  const input = parseInput();

  const features: Map<string, string> = new Map();
  createWalls(input, features);
  features.set(new Point(500, 0).toString(), "Entry");

  const highestWallYValue = findRangeOfFeatures(features)[3];
  let simulationComplete = false;
  while (!simulationComplete) {
    simulationComplete = placeNextSandUnit(features, highestWallYValue);
  }
  console.log(countSandUnits(features));
}

function parseInput(): Point[][] {
  const input = readInput()
    .split("\n")
    .map((lines: string) => lines.trim().split(" -> "))
    .map((points) => points.map((point) => stringToPoint(point)));
  return input;
}

class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x},${this.y}`;
  }

  getPointDown() {
    return new Point(this.x, this.y + 1);
  }

  getPointDownAndLeft() {
    return new Point(this.x - 1, this.y + 1);
  }

  getPointDownAndRight() {
    return new Point(this.x + 1, this.y + 1);
  }

  equals(otherPoint: Point) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }
}

function countSandUnits(features: Map<string, string>) {
  return Array.from(features.values()).filter((v) => v === "Sand").length - 1;
}

function placeNextSandUnit(features: Map<string, string>, maxY: number) {
  let stoppedMoving = false;
  let sandLocation = new Point(500, 0);

  while (!stoppedMoving) {
    const previousLocation = sandLocation;
    sandLocation = getNextSandLocation(sandLocation, features);
    if (sandLocation.y > maxY) {
      return true;
    }
    if (sandLocation.equals(previousLocation)) {
      features.set(sandLocation.toString(), "Sand");
      stoppedMoving = true;
    } else {
      if (!previousLocation.equals(new Point(500, 0))) {
        features.delete(previousLocation.toString());
      }
      features.set(sandLocation.toString(), "Sand");
    }
  }

  return false;
}

function getNextSandLocation(location: Point, features: Map<string, string>) {
  if (canMoveDown(location, features)) {
    return location.getPointDown();
  } else if (canMoveDownAndLeft(location, features)) {
    return location.getPointDownAndLeft();
  } else if (canMoveDownAndRight(location, features)) {
    return location.getPointDownAndRight();
  } else {
    return location;
  }
}

function canMoveDown(location: Point, features: Map<string, string>) {
  return !features.has(location.getPointDown().toString());
}

function canMoveDownAndLeft(location: Point, features: Map<string, string>) {
  return !features.has(location.getPointDownAndLeft().toString());
}

function canMoveDownAndRight(location: Point, features: Map<string, string>) {
  return !features.has(location.getPointDownAndRight().toString());
}

function findRangeOfFeatures(features: Map<string, string>) {
  const points = Array.from(features.keys()).map((str) => stringToPoint(str));
  points.sort((a, b) => a.x - b.x);
  const minX = points.slice(0, 1)[0].x;
  const maxX = points.slice(-1)[0].x;
  points.sort((a, b) => a.y - b.y);
  const minY = points.slice(0, 1)[0].y;
  const maxY = points.slice(-1)[0].y;
  return [minX, maxX, minY, maxY];
}

function stringToPoint(str: string) {
  const [x, y] = str.split(",").map((x) => Number(x));
  return new Point(x, y);
}

function getAllWallPoints(start: Point, end: Point) {
  const wallPoints: Point[] = [];
  if (start.x === end.x) {
    if (start.y < end.y) {
      for (let i = start.y; i <= end.y; i++) {
        wallPoints.push(new Point(start.x, i));
      }
    } else {
      for (let i = start.y; i >= end.y; i--) {
        wallPoints.push(new Point(start.x, i));
      }
    }
  } else if (start.y === end.y) {
    if (start.x < end.x) {
      for (let i = start.x; i <= end.x; i++) {
        wallPoints.push(new Point(i, start.y));
      }
    } else {
      for (let i = start.x; i >= end.x; i--) {
        wallPoints.push(new Point(i, start.y));
      }
    }
  } else {
    throw new Error("Wall mismatch?");
  }
  return wallPoints;
}

function printState(features: Map<string, string>) {
  const ranges = findRangeOfFeatures(features);
  let [minX, maxX, minY, maxY] = ranges;
  // add extra  cell each side for visualisation
  minX -= 1;
  minY -= 1;
  maxX += 1;
  maxY += 1;

  for (let i = minY; i <= maxY; i++) {
    let row = "";
    for (let j = minX; j <= maxX; j++) {
      const key = new Point(j, i).toString();
      if (features.has(key)) {
        const value = features.get(key);
        switch (value) {
          case "Wall":
            row = row.concat("#");
            break;
          case "Entry":
            row = row.concat("+");
            break;
          case "Sand":
            row = row.concat("o");
            break;
        }
      } else {
        row = row.concat(".");
      }
    }
    console.log(row);
  }
  console.log("\n");
}

function createWalls(input: Point[][], features: Map<string, string>) {
  input.forEach((section) => {
    for (let i = 1; i < section.length; i++) {
      const start = section[i - 1];
      const end = section[i];
      const wallPoints = getAllWallPoints(start, end);
      wallPoints.forEach((point) => {
        features.set(point.toString(), "Wall");
      });
    }
  });
  return features;
}

solveProblem();
