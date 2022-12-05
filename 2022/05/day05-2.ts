import { readBasicInput } from "../helperFunctions.ts";

const [cratesInput, proceduresInput] = readBasicInput().split(
  "\n\n",
);

const createStacks = (crates: string) => {
  const numberOfStacks = crates.split(" ")
    .filter((n) => parseInt(n, 10))
    .map((x) => Number(x))
    .pop();

  const stacks: string[][] = [];

  if (numberOfStacks != undefined) {
    for (let i = 0; i < numberOfStacks; i++) {
      stacks.push([]);
    }
  }

  const arrangement = crates.split(" 1 ")[0].split("\n").filter((x) =>
    x !== ""
  );
  arrangement.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      const crate = line.split("")[4 * i + 1];
      if (crate != " ") {
        const column = stacks.at(i);
        if (column != undefined) column.unshift(crate);
      }
    }
  });

  return stacks;
};

class Procedure {
  items: number;
  from: number;
  to: number;

  constructor(items: number, from: number, to: number) {
    this.items = items;
    this.from = from;
    this.to = to;
  }
}

const parseProcedures = (procedures: string) => {
  return procedures.split("\n").map((x) => {
    const [items, from, to] = x
      .split(" ")
      .filter((n) => parseInt(n, 10))
      .map((x) => Number(x));
    return new Procedure(items, from, to);
  });
};

const executeProcedure = (procedure: Procedure) => {
  const crate = stacks.at(procedure.from - 1)?.splice(procedure.items * -1);
  if (crate != undefined) {
    stacks.at(procedure.to - 1)?.push(...crate);
  }
  console.log(crate);
  console.log(stacks);
};

const getResult = () => {
  let result = "";
  stacks.forEach((x) => result += x.pop());
  return result;
};

const stacks = createStacks(cratesInput);
console.log(stacks);

const procedures = parseProcedures(proceduresInput);
console.log(procedures);

procedures.forEach(executeProcedure);

console.log(getResult());
