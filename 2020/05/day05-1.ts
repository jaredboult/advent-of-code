import { readInput } from '../helperFunctions.ts';

const rowBits = 7
const columnBits = 3

let maxId = Number.MIN_VALUE;

const boardingPasses = readInput()
    .split('\n')
    .forEach(pass => {
        const row = pass.slice(0, rowBits);
        const column = pass.slice(columnBits * -1)
        const result = binarySpacePartitioner(row) * 8 + binarySpacePartitioner(column);
        if (maxId < result){
            maxId = result;
        }
    });


console.log(maxId);

function binarySpacePartitioner(characters: string) : number {
    let lowerBound = 0;
    let upperBound = (2 ** characters.length) - 1;
    for (let i = 0; i < characters.length; i++){
        if (i === characters.length - 1){
            switch (characters.at(i)) {
                case "F":
                case "L":
                    return lowerBound;
                case "B":
                case "R":
                    return upperBound;
            }
        }
        switch (characters.at(i)) {
            case "F":
            case "L":
                upperBound = Math.floor((lowerBound + upperBound) / 2);
                break;
            case "B":
            case "R":
                lowerBound = Math.ceil((lowerBound + upperBound) / 2);
                break;
        }
    }
    return NaN;
}
