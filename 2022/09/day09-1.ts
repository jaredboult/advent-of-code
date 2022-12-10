import { readInput } from "../helperFunctions.ts";

function solveProblem() {
  const inputs = readInput()
    .split("\n")
    .map((i) => ({
      direction: i.split(" ").at(0) ?? "",
      steps: parseInt(i.split(" ").at(1) ?? "", 10),
    }));

  let head = new Position(0, 0);
  let tail = new Position(0, 0);
  const tailPositions = new Set<string>();

  for (const move of inputs) {
    [head, tail] = processMove(head, tail, move, tailPositions);
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
  tail: Position,
  move: Move,
  tailPositions: Set<string>,
) {
  let currentHead = head;
  let currentTail = tail;
  let steps = move.steps;
  // console.log(`\n${JSON.stringify(move)}`);
  while (steps) {
    switch (move.direction) {
      case "R":
        currentHead = currentHead.moveRight();
        if (currentTail.x === currentHead.x - 2) {
          if (currentTail.y === currentHead.y) {
            currentTail = currentTail.moveRight();
          } else if (currentTail.y > currentHead.y) {
            currentTail = currentTail.moveRight().moveDown();
          } else {
            currentTail = currentTail.moveRight().moveUp();
          }
        }
        break;
      case "L":
        currentHead = currentHead.moveLeft();
        if (currentTail.x === currentHead.x + 2) {
          if (currentTail.y === currentHead.y) {
            currentTail = currentTail.moveLeft();
          } else if (currentTail.y > currentHead.y) {
            currentTail = currentTail.moveLeft().moveDown();
          } else {
            currentTail = currentTail.moveLeft().moveUp();
          }
        }
        break;
      case "U":
        currentHead = currentHead.moveUp();
        if (currentTail.y === currentHead.y - 2) {
          if (currentTail.x === currentHead.x) {
            currentTail = currentTail.moveUp();
          } else if (currentTail.x > currentHead.x) {
            currentTail = currentTail.moveUp().moveLeft();
          } else {
            currentTail = currentTail.moveUp().moveRight();
          }
        }
        break;
      case "D":
        currentHead = currentHead.moveDown();
        if (currentTail.y === currentHead.y + 2) {
          if (currentTail.x === currentHead.x) {
            currentTail = currentTail.moveDown();
          } else if (currentTail.x > currentHead.x) {
            currentTail = currentTail.moveDown().moveLeft();
          } else {
            currentTail = currentTail.moveDown().moveRight();
          }
        }
        break;
    }
    // console.log(
    //   `Head: (${currentHead.x},${currentHead.y}), Tail: (${currentTail.x},${currentTail.y})`,
    // );
    // printTestSpace(currentHead, currentTail);
    tailPositions.add(currentTail.toString());
    steps--;
  }
  return [currentHead, currentTail];
}

function printTestSpace(head: Position, tail: Position) {
  const grid: string[][] = [];
  const gridSize = 6;
  for (let i = 0; i < gridSize; i++) {
    const row: string[] = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(".");
    }
    grid.push(row);
  }
  grid[tail.y][tail.x] = "T";
  grid[head.y][head.x] = "H";

  for (let i = 4; i >= 0; i--) {
    let row = "";
    for (let j = 0; j < gridSize; j++) {
      row = row.concat(grid[i][j], " ");
    }
    console.log(row);
  }
  console.log("\n");
}

solveProblem();
