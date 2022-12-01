const fs = require("fs");

const input = fs.readFileSync("input1.txt").toString().split("\n\n");

const totals = input.map((x) => {
    const values = x.split("\n").map((x) => parseInt(x, 10));
    return values.reduce((acc, curr) => acc + curr);
});

const sorted = totals.sort((a, b) => b - a);
console.log(sorted[0] + sorted[1] + sorted[2]);
