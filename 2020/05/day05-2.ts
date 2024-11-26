import { readInput } from '../helperFunctions.ts';

const rowBits = 7
const columnBits = 3

const boardingPasses = readInput()
    .split('\n')
    .map(pass => {
        const row = pass.slice(0, rowBits);
        const column = pass.slice(columnBits * -1)
        return binarySpacePartitioner(row) * 8 + binarySpacePartitioner(column);
    })
    .sort((a, b) => a - b);

for (let i = 8; i < boardingPasses.length - 8; i++){
    if (boardingPasses[i+1] - boardingPasses[i] === 2)
        console.log(boardingPasses[i] + 1);
}

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
