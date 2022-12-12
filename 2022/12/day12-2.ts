import { readInput, sortNumbers } from "../helperFunctions.ts";

function solveProblem() {
  const input = readInput();
  const grid = input
    .split("\n")
    .map((x) =>
      x.split("")
        .map((letter) => new Square(letter, getElevation(letter)))
    );

  const [start, end] = findStartAndEnd(grid);
  populateNeighbours(grid);

  const lowestSquares = grid.flat().filter((s) => s.elevation === 1);
  const results = lowestSquares.map((s) => dijkstra(grid.flat(), s, end));
  const min = sortNumbers(results, false).shift();
  console.log(min);
}

class Square {
  label: string;
  elevation: number;
  neighbours: Square[];
  distanceFromStart: number;

  constructor(label: string, elevation: number) {
    this.label = label;
    this.elevation = elevation;
    this.neighbours = [];
    this.distanceFromStart = Infinity;
  }
}

const getElevation = (str: string) => {
  const values = "abcdefghijklmnopqrstuvwxyz".split("");
  if (str === "S") {
    return 1;
  } else if (str === "E") {
    return 26;
  }
  return values.indexOf(str) + 1;
};

const findStartAndEnd = (grid: Square[][]) => {
  let start: Square | undefined = undefined;
  let end: Square | undefined = undefined;
  for (const row of grid) {
    for (const square of row) {
      if (square.label === "S") {
        start = square;
      } else if (square.label === "E") {
        end = square;
      }
    }
  }
  return [start, end];
};

const populateNeighbours = (grid: Square[][]) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const currentSquare = grid[i][j];
      const possibleNeighbours: Square[] = [];
      if (i > 0) {
        possibleNeighbours.push(grid[i - 1][j]);
      }
      if (i < grid.length - 1) {
        possibleNeighbours.push(grid[i + 1][j]);
      }
      if (j > 0) {
        possibleNeighbours.push(grid[i][j - 1]);
      }
      if (j < grid[i].length - 1) {
        possibleNeighbours.push(grid[i][j + 1]);
      }
      for (const square of possibleNeighbours) {
        if (square.elevation <= currentSquare.elevation + 1) {
          currentSquare.neighbours.push(square);
        }
      }
    }
  }
};

function dijkstra(
  nodes: Square[],
  start: Square | undefined,
  end: Square | undefined,
) {
  if (start === undefined || end === undefined) return 0;

  const visitedSet: Set<Square> = new Set();

  const queue = [...nodes];
  for (const square of nodes) {
    square.distanceFromStart = Infinity;
  }
  start.distanceFromStart = 0;
  queue.sort((a, b) => a.distanceFromStart - b.distanceFromStart);

  while (queue.length) {
    const v = queue.shift();

    if (v === undefined) return 0;
    visitedSet.add(v);

    for (const u of v.neighbours) {
      if (visitedSet.has(u)) continue;
      const alternative = v.distanceFromStart + 1;
      if (alternative < u.distanceFromStart) {
        u.distanceFromStart = alternative;
        queue.sort((a, b) => a.distanceFromStart - b.distanceFromStart);
      }
    }
  }
  return end.distanceFromStart;
}

const printGrid = (grid: Square[][]) => {
  for (let i = 0; i < grid.length; i++) {
    let row = "";
    for (let j = 0; j < grid[i].length; j++) {
      row = row.concat(String(grid[i][j].label));
    }
    console.log(row);
  }
};

solveProblem();
