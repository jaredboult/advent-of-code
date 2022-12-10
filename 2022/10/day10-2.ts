import { readInput } from "../helperFunctions.ts";

function solveProblem() {
  const inputs = readInput()
    .split("\n")
    .map((i) => instructionBuilder(i))
    .flatMap((i) => i ? [i] : []);

  let X = 1;
  let inProgress: Instruction | undefined;
  const screen = new CRTScreen();

  while (inputs.length > 0 || inProgress !== undefined) {
    screen.drawPixel(X);
    if (inProgress !== undefined) {
      inProgress.cycles--;
      if (inProgress.cycles === 0) {
        X = inProgress.execute(X);
        inProgress = undefined;
      }
    } else {
      inProgress = inputs.shift();
      if (inProgress !== undefined) {
        inProgress.cycles--;
        if (inProgress.cycles === 0) {
          X = inProgress.execute(X);
          inProgress = undefined;
        }
      }
    }
  }
  screen.displayScreen();
}

function instructionBuilder(str: string) {
  const type = str.split(" ").at(0) ?? "";
  const input = Number(str.split(" ").at(1));
  switch (type) {
    case "noop":
      return new Noop();
    case "addx":
      return new Addx(input);
  }
  return undefined;
}

abstract class Instruction {
  cycles: number;

  constructor(cycles: number) {
    this.cycles = cycles;
  }

  abstract execute(register: number): number;

  abstract toString(): string;
}

class Noop extends Instruction {
  constructor() {
    super(1);
  }

  execute(register: number): number {
    return register;
  }
  toString(): string {
    return "noop";
  }
}

class Addx extends Instruction {
  value: number;

  constructor(value: number) {
    super(2);
    this.value = value;
  }

  execute(register: number): number {
    return register + this.value;
  }
  toString(): string {
    return `addx ${this.value}`;
  }
}

class CRTScreen {
  pixels: string[][];
  width = 40;
  height = 6;

  constructor() {
    this.pixels = [];
  }

  drawPixel(register: number) {
    if (
      this.pixels[0] === undefined ||
      this.pixels.at(-1)?.length === this.width
    ) {
      this.pixels.push([]);
    }
    const rowPosition = this.pixels.at(-1)?.length;
    if (rowPosition !== undefined) {
      this.pixels.at(-1)?.push(
        (register - 1 === rowPosition ||
            register === rowPosition ||
            register + 1 === rowPosition)
          ? "#"
          : ".",
      );
    } else {
      this.pixels.at(-1)?.push(".");
    }
  }

  displayScreen() {
    for (let i = 0; i < this.height; i++) {
      let row = "";
      for (let j = 0; j < this.width; j++) {
        row = row.concat(this.pixels[i][j], "");
      }
      console.log(row);
    }
  }
}

solveProblem();
