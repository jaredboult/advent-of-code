import {readInput} from "../helperFunctions.ts";

const input = readInput().split("\n\n");
const seedRangeData = input[0]
    .split(": ")[1]
    .split(" ")
    .map(x => Number.parseInt(x, 10));
const ranges : {start: number, range: number }[] = [];
for (let i = 0; i < seedRangeData.length; i += 2){
    const pair = {
        start: seedRangeData[i],
        range: seedRangeData[i+1]
    };
    ranges.push(pair);
}

const maps = input.slice(1).map(m => {
    return m.split("\n").slice(1)
        .map(g => {
            return g.split(" ")
                .map(str => Number.parseInt(str, 10))
        })
        .map(x => {
            return ({
                destination: x[0],
                source: x[1],
                range: x[2]
            });
        }).sort((a, b) => a.destination - b.destination);
}).reverse();

let answer;
let i = 0;
while(!answer){
    let result = i;
    maps.forEach(groups => {
        let updated = false;
        groups.forEach(g => {
                if (!updated && result >= g.destination && result < g.destination + g.range) {
                    const offset = result - g.destination
                    result = g.source + offset;
                    updated = true;
                }
            }
        )
    })
    if(isValidSeed(result)){
        answer = result
        break;
    }
    i++;
}
console.log(i);

function isValidSeed(result: number){
    for (let i = 0; i < ranges.length; i++){
        const current = ranges[i];
        if(result >= current.start && result < current.start + current.range){
            return true
        }
    }
    return false;
}
