import { readInput } from '../helperFunctions.ts';

const input = readInput()
    .split('\n')
    .map(x => Number(x))
    .sort((a, b) => a - b);

console.log(JSON.stringify(input));


function findResult(input: number[]) {
    for (let x = 0; x < input.length - 2; x++){
        for (let y = x+1; y < input.length - 1; y++){
            if ((input[x] + input[y]) > 2020) continue;
            for (let z = y+1; z < input.length; z++){
                console.log(`x:${input[x]} y: ${input[y]} z: ${input[z]} sum: ${input[x] + input[y] + input[z]}`);
                if ((input[x] + input[y] + input[z]) > 2020) continue;
                if ((input[x] + input[y] + input[z]) === 2020) {
                    console.log("Success!")
                    return (input[x] * input[y] * input[z]);
                }
                    
            }
        }
    }
}

console.log(findResult(input));
