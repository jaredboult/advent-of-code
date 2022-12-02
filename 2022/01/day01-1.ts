import { readBasicInput, sortNumbers, sum } from "../helperFunctions.ts";

const input = readBasicInput().split("\n\n");

const totals = input.map((x) => {
  const values = x.split("\n").map((x) => Number(x));
  return sum(values);
});

const sorted = sortNumbers(totals);
console.log(sorted[0]);
