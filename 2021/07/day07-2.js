const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split(",").map(Number);
crabs = new Map();
input.forEach(x => initialiseCrabs(x));
const result = getMinFuel(crabs);
console.log(result);

function initialiseCrabs(num) {
    if (crabs.has(num)) {
        crabs = crabs.set(num, crabs.get(num) + 1);
    } else {
        crabs.set(num, 1);
    }
}

function range(start, end) {
    return [...Array(end - start + 1).keys()].map(x => x + start);
}

function getMinFuel(crabs){
    let allValues = Array.from(crabs.keys());
    allValues = allValues.sort((a,b) => a-b);
    const min = allValues.slice(0,1)[0];
    const max = allValues.slice(-1)[0];
    const possibleValues = range(min, max);
    const totals = possibleValues
                    .map(x => { return allValues
                                .reduce((p, c) => 
                                    { 
                                        const s = Math.abs(c - x);
                                        const cost = (s*(s+1))/2;
                                        return p + cost * crabs.get(c);
                                    }, 0)
                                }
                        );
    return Math.min(...totals);
}