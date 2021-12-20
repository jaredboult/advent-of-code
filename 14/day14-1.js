const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split("\n");

const template = input.shift();
let polymer = template;
const findReplace = new Map();
// remove newline
input.shift();
input.forEach(rule => {
    const [adjacent, insert] = rule.split(" -> ");
    const replacement = adjacent.slice(0,1) + insert + adjacent.slice(1);
    findReplace.set(adjacent, replacement);
})

console.log(template);
console.log(findReplace);

const steps = 10;
for (let i = 1; i <= steps; i++){
    polymer = applyStep(polymer, findReplace);
    // console.log(`Step ${i}: ${polymer}`);
}

const elementSet = new Set();
polymer.split('').forEach(e => elementSet.add(e));
const elementArr = Array.from(elementSet);
const elementCounts = elementArr.map(e => polymer.split(e).length - 1);
const maxIndex = elementCounts.reduce((a,b,i) => a[0] < b ? [b,i] : a, [Number.MIN_VALUE,-1])[1];
const minIndex = elementCounts.reduce((a,b,i) => a[0] > b ? [b,i] : a, [Number.MAX_VALUE,-1])[1];
console.log(elementArr);
console.log(elementCounts);
console.log(elementCounts[maxIndex] - elementCounts[minIndex]);


function applyStep(polymer, findReplace){
    let result = polymer;
    for (let i = 0; i < result.length-1; i++){
        const pair = result.slice(i, i+2);
        if (findReplace.has(pair)){
            const before = result.slice(0,i);
            const after = result.slice(i+2);
            result = before + findReplace.get(pair) + after;
            i++;
        }
    }
    return result;
}

