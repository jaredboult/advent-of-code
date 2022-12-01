const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split(",").map(Number);

console.log(input);

crabs = new Map();
input.forEach(x => initialiseCrabs(x));

const result = getMinFuel(crabs);

function initialiseCrabs(num) {
    if (crabs.has(num)) {
        crabs = crabs.set(num, crabs.get(num) + 1);
    } else {
        crabs.set(num, 1);
    }
}

function getMinFuel(crabs){
    const allValues = Array.from(crabs.keys());
    const totals = allValues
                    .map(x => { return allValues
                                .reduce((p, c) => 
                                    { 
                                        return p + Math.abs(c - x) * crabs.get(c);
                                    }, 0)
                                }
                        );
    return Math.min(...totals);
}