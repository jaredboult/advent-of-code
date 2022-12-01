import { readBasicInput, sortNumbers } from "../helperFunctions.ts";

const input = readBasicInput().split("\n\n");

const totals = input.map((x) => {
  const values = x.split("\n").map((x) => Number(x));
  return values.reduce((acc, curr) => acc + curr);
});

const sorted = sortNumbers(totals);
console.log(sorted[0]);
