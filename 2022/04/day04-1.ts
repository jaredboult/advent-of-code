import { readBasicInput } from "../helperFunctions.ts";

const pairs = readBasicInput()
  .split("\n")
  .map((x) => x.split(","));

let total = 0;

pairs.forEach((pair) => {
  const leftBoth = pair[0].split("-");
  const leftStart = Number(leftBoth[0]);
  const leftEnd = Number(leftBoth[1]);
  const rightBoth = pair[1].split("-");
  const rightStart = Number(rightBoth[0]);
  const rightEnd = Number(rightBoth[1]);

  if (
    (leftStart <= rightStart && leftEnd >= rightEnd) ||
    (rightStart <= leftStart && rightEnd >= leftEnd)
  ) {
    total++;
  }
});

console.log(total);
