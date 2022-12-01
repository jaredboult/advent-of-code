const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

let depth = 0;
let horizontal = 0;
let aim = 0;

input.forEach((x) => {
    const both = x.split(' ');
    const direction = both[0];
    const amount = parseInt(both[1], 10);
    switch (direction) {
    case 'down':
        aim += amount;
        break;
    case 'up':
        aim -= amount;
        break;
    case 'forward':
        horizontal += amount;
        depth += aim * amount;
        break;
    default:
    }
});

console.log(`horizontal = ${horizontal}`);
console.log(`depth = ${depth}`);
console.log(`answer = ${horizontal * depth}`);
