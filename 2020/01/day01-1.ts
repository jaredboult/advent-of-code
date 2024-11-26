import { readInput } from '../helperFunctions.ts';

const input = readInput()
    .split('\n')
    .map(x => Number(x));

let result = NaN;

for (let x = 0; x < input.length; x++){
    for (let y = x+1; y < input.length; y++){
        if (input[x] + input[y] === 2020)
            result = input[x] * input[y]
    }
}

console.log(result);
