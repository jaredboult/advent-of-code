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

applySteps(40, pairCounts, insertRules)

const letterTotals = countLetters(pairCounts);
console.log(letterTotals);
const result = getResult(letterTotals);
console.log(result);

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

function applySteps(steps, counts, rules) {
    for(let i = 1; i <= steps; i++){
        const insertions = new Map();
        counts.forEach((v, key) => {
            let total = v;
            if(insertions.has(key)){
                insertions.set(key, insertions.get(key) - total);
            } else {
                insertions.set(key, -1 * total);
            }
            const firstNewPair = key.slice(0,1) + rules.get(key);
            const secondNewPair = rules.get(key) + key.slice(1);
            if(insertions.has(firstNewPair)){
                insertions.set(firstNewPair, insertions.get(firstNewPair) + total);
            } else {
                insertions.set(firstNewPair, total);
            }
            if(insertions.has(secondNewPair)){
                insertions.set(secondNewPair, insertions.get(secondNewPair) + total);
            } else {
                insertions.set(secondNewPair, total);
            }
        });
        insertions.forEach((v, key) => {
            if(counts.has(key)){
                counts.set(key, counts.get(key) + v);
            } else {
                counts.set(key, v);
            }
        });
        console.log(`Step ${i} complete`);
    }
    
}

function countLetters(counts) {
    let result = new Map();
    counts.forEach((v, key) => {
        const [first, second] = key.split('');
        if(result.has(first)){
            result.set(first, result.get(first) + v/2);
        } else {
            result.set(first, v/2);
        }
        if(result.has(second)){
            result.set(second, result.get(second) + v/2);
        } else {
            result.set(second, v/2);
        }
    })
    return result;
}

function getResult(totals){
    const sorted = Array.from(totals.values()).sort((a,b) => a - b);
    return sorted.slice(-1) - sorted.slice(0,1);
}
