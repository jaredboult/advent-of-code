import { readInput, product } from '../helperFunctions.ts';

const map = readInput()
    .split('\n')
    .map(line => line.split(""));

const slopes = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
]

const tree = "#";

function countTrees(right: number, down: number){
    let x = 0;
    let trees = 0;
    for (let y = 0; y < map.length; y += down){
        if (x >= map[y].length){
            x -= map[y].length;
        }
        if (map[y][x] === tree) trees++;
        x += right;
    }
    return trees;
}

const totals = slopes.map(([right, down]) => countTrees(right, down));

console.log(product(totals));
