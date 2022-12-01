import { readBasicInput } from "../helperFunctions.ts";

const input = readBasicInput().split("\n\n");

const totals = input.map((x) => {
    const values = x.split("\n").map((x) => Number(x));
    return values.reduce((acc, curr) => acc + curr);
});

const sorted = totals.sort((a, b) => b - a);
console.log(sorted[0]);
