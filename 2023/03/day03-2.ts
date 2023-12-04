import {readInput} from "../helperFunctions.ts";

const lines = readInput()
    .split('\n')
    .map(line => line.split(""));

let total = 0;

for (let i = 0; i < lines.length; i++){
    for (let j = 0; j < lines[i].length; j++){
        const char = lines.at(i)?.at(j) ?? "";
        if (!isGearSymbol(char)) continue;

        const neighbours = [];
        for (let y = i-1; y <= i+1; y++){
            for (let x = j-1; x <= j+1; x++){
                try {
                    const neighbour = {
                        x: x,
                        y: y,
                        char: lines[y][x]
                    }
                    neighbours.push(neighbour)
                } catch (_) {}
            }
        }

        const numberNeighbours = neighbours.filter(neighbour => isNumber(neighbour.char));
        const partNumbers = numberNeighbours.flatMap(n => {
            let partNumber = "" + n.char;
            // go left
            let left = 1;
            let leftChar = lines.at(n.y)?.at(n.x - left);
            while(n.x - left >= 0 && isNumber(leftChar ?? "")){
                partNumber = leftChar + partNumber;
                left++;
                leftChar = lines.at(n.y)?.at(n.x - left);
            }
            // go right
            let right = 1;
            let rightChar = lines.at(n.y)?.at(n.x + right);
            while(isNumber(rightChar ?? "")){
                partNumber += rightChar;
                right++;
                rightChar = lines.at(n.y)?.at(n.x + right);
            }
            return partNumber;
        })
        const uniquePartNumbers = new Set(partNumbers);
        if(uniquePartNumbers.size === 2){
            let product = 1;
            uniquePartNumbers.forEach(u => {
                product *= Number.parseInt(u, 10);
            });
            total += product;
        }
    }
}

console.log(total);

function isNumber(input: string){
    return !Number.isNaN(Number.parseInt(input, 10));
}

function isGearSymbol(input: string){
    return input === "*";
}