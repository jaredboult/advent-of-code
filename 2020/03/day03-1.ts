import { readInput } from '../helperFunctions.ts';

const map = readInput()
    .split('\n')
    .map(line => line.split(""));

const xShift = 3;
const yShift = 1;

const tree = "#";

let x = 0;
let trees = 0;
for (let y = 0; y < map.length; y += yShift){
    if (x >= map[y].length){
        x -= map[y].length;
    }
    if (map[y][x] === tree) trees++;
    x += xShift;
}

console.log(trees);