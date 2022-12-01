const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

let depth = 0;
let horizontal = 0;

input.forEach((x) => {
    const both = x.split(' ');
    const direction = both[0];
    const amount = parseInt(both[1], 10);
    switch (direction) {
    case 'down':
        depth += amount;
        break;
    case 'up':
        depth -= amount;
        break;
    case 'forward':
        horizontal += amount;
        break;
    default:
    }
});

console.log(`horizontal = ${horizontal}`);
console.log(`depth = ${depth}`);
console.log(`answer = ${horizontal * depth}`);
