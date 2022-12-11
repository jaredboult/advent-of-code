import { printGrid, readInput } from "../helperFunctions.ts";

function solveProblem() {
  const inputs = readInput()
    .split("\n")
    .map((i) => ({
      direction: i.split(" ").at(0) ?? "",
      steps: parseInt(i.split(" ").at(1) ?? "", 10),
    }));

  const knotsAfterHead = 9;

  let head = new Position(0, 0);
  let knots: Position[] = [];
  for (let i = 0; i < knotsAfterHead; i++) {
    knots.push(new Position(0, 0));
  }
  const tailPositions = new Set<string>();

  for (const move of inputs) {
    [head, ...knots] = processMove(head, knots, move, tailPositions);
  }
  console.log(tailPositions.size);
}

interface Move {
  direction: string;
  steps: number;
}

class Position {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveRight() {
    return new Position(this.x + 1, this.y);
  }

  moveLeft() {
    return new Position(this.x - 1, this.y);
  }

  moveUp() {
    return new Position(this.x, this.y + 1);
  }

  moveDown() {
    return new Position(this.x, this.y - 1);
  }

  toString() {
    return `(${this.x},${this.y})`;
  }
}

function processMove(
  head: Position,
  knots: Position[],
  move: Move,
  tailPositions: Set<string>,
) {
  let currentHead = head;
  let currentKnots = knots;
  let futureKnots: Position[] = [];
  let steps = move.steps;

  while (steps) {
    currentHead = moveHead(currentHead, move);
    for (let i = 0; i < currentKnots.length; i++) {
      if (i === 0) {
        futureKnots.push(moveKnot(currentHead, currentKnots[i]));
      } else {
        futureKnots.push(moveKnot(futureKnots[i - 1], currentKnots[i]));
      }
    }
    currentKnots = futureKnots;
    futureKnots = [];
    const tailPositionString = currentKnots.at(-1)?.toString();
    if (tailPositionString !== undefined) {
      tailPositions.add(tailPositionString);
    }
    steps--;
  }
  return [currentHead, ...currentKnots];
}

function moveHead(head: Position, move: Move) {
  switch (move.direction) {
    case "R":
      return head.moveRight();
    case "L":
      return head.moveLeft();
    case "U":
      return head.moveUp();
    case "D":
      return head.moveDown();
  }
  return head;
}

function moveKnot(head: Position, tail: Position) {
  if (tail.x === head.x - 2) {
    if (tail.y === head.y) {
      return tail.moveRight();
    } else if (tail.y > head.y) {
      return tail.moveRight().moveDown();
    } else {
      return tail.moveRight().moveUp();
    }
  } else if (tail.x === head.x + 2) {
    if (tail.y === head.y) {
      return tail.moveLeft();
    } else if (tail.y > head.y) {
      return tail.moveLeft().moveDown();
    } else {
      return tail.moveLeft().moveUp();
    }
  } else if (tail.y === head.y - 2) {
    if (tail.x === head.x) {
      return tail.moveUp();
    } else if (tail.x > head.x) {
      return tail.moveUp().moveLeft();
    } else {
      return tail.moveUp().moveRight();
    }
  } else if (tail.y === head.y + 2) {
    if (tail.x === head.x) {
      return tail.moveDown();
    } else if (tail.x > head.x) {
      return tail.moveDown().moveLeft();
    } else {
      return tail.moveDown().moveRight();
    }
  }
  return tail;
}

function printTestSpace(head: Position, knots: Position[]) {
  // Construct grid with dots
  const grid: string[][] = [];
  const gridHeight = 21;
  const gridWidth = 27;
  for (let i = 0; i < gridHeight; i++) {
    const row: string[] = [];
    for (let j = 0; j < gridWidth; j++) {
      row.push(".");
    }
    grid.push(row);
  }

  // Add head and knot markers
  for (let i = knots.length - 1; i >= 0; i--) {
    grid[knots[i].y + 5][knots[i].x + 12] = `${i + 1}`;
  }
  grid[head.y + 5][head.x + 12] = "H";

  printGrid(grid);
}

solveProblem();
