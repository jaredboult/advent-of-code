const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split("\n");

const template = input.shift();
const pairCounts = new Map();
const insertRules = new Map();

initialiseCounts(input, template, pairCounts);
initialiseInsertRules(input, insertRules);

console.log(template);
console.log(pairCounts);
console.log(insertRules);

applySteps(10, template, pairCounts, insertRules)

function initialiseCounts(input, template, counts){
    for (let i = 0; i < template.length - 1; i++){
        const pair = template.slice(i, i+2);
        if (counts.has(pair)) {
            counts.set(pair, counts.get(pair) + 1);
        } else {
            counts.set(pair, 1);
        }
    }
}

function initialiseInsertRules(input, rules){
    // remove newline
    input.shift();
    input.forEach(rule => {
        const [pair, insert] = rule.split(" -> ");
        rules.set(pair, insert);
    })
}

function applySteps(steps, template, counts, rules) {
    let letterTotals = new Map();
    template.split('').forEach(letter => {
        letterTotals.set(letter, letterTotals.get(letter))
    })
}
