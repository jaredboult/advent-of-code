import {readInput} from "../helperFunctions.ts";

const input = readInput().split("\n\n");
const seeds = input[0]
    .split(": ")[1]
    .split(" ")
    .map(x => Number.parseInt(x, 10));

const maps = input.slice(1).map(m => {
    return m.split("\n").slice(1)
        .map(g => g.split(" ")
            .map(str => Number.parseInt(str, 10)));
});

const locations = seeds.map(s => {
    let result = s;
    maps.forEach(groups => {
        let updated = false;
        groups.forEach(x => {
            const destination = x[0];
            const source = x[1];
            const range = x[2];

            if(!updated && result >= source && result < source + range){
                const offset = result - source;
                result = destination + offset;
                updated = true;
            }
        })
    })
    return result;
})

console.log(locations.sort((a, b) => b - a).pop());
