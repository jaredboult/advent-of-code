const fs = require('fs');

const input = fs.readFileSync("input.txt").toString().split("\n");

let depth = 0, horizontal = 0, aim = 0;

for (const command of input) {
    const both = command.split(" ");
    const direction = both[0];
    const amount = parseInt(both[1]);
    switch (direction) {
        case "down":
            aim += amount;
            break;
        case "up":
            aim -= amount;
            break;
        case "forward":
            horizontal += amount;
            depth += aim * amount;
            break;
    }
}

console.log("horizontal = ", horizontal);
console.log("depth = ", depth);
console.log("answer = ", horizontal * depth);