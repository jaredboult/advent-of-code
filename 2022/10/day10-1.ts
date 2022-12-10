import { readInput } from "../helperFunctions.ts";

function solveProblem() {
  const inputs = readInput()
    .split("\n")
    .map((i) => instructionBuilder(i))
    .flatMap((i) => i ? [i] : []);

  let X = 1;
  const measurements: number[] = [];
  let inProgress: Instruction | undefined;

  while (inputs.length > 0 || inProgress !== undefined) {
    measurements.push(X);
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

  let total = 0;
  for (let i = 20; i <= 220; i += 40) {
    total += measurements[i - 1] * i;
  }
  console.log(total);
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

solveProblem();
