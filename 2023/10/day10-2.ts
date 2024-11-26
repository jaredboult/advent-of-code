import {readInput} from "../helperFunctions.ts"

const histories = readInput()
    .split("\n")
    .map(line => line.split(" ")
        .map(str => Number.parseInt(str, 10))
    );
// console.log(histories);

const allDifferences = new Map<number,number[][]>();

// create the arrays for all differences of each history
histories.forEach((history, index) => {
    const differences: number[][] = [];
    differences.push(history);
    let nextEntry: number[];
    do {
        nextEntry = [];
        const currentSequence = differences.at(-1)!;
        currentSequence.forEach((x, i) => {
            if(i !== currentSequence.length - 1){
                const difference = currentSequence[i+1] - x;
                nextEntry.push(difference);
            }
        })
        differences.push(nextEntry);
    } while(new Set(nextEntry).size > 1 || nextEntry[0] !== 0);
    allDifferences.set(index, differences);
})

// console.log(allDifferences)

const result = Array.from(allDifferences.values()).map(lines => {
    for (let i = lines.length - 1; i >= 0; i--){
        if(i === lines.length - 1){
            lines[i] = [0, ...lines[i]];
        } else {
            const neighbour = lines[i][0];
            const differenceBelow = lines[i+1][0];
            const newValue =  neighbour - differenceBelow;
            lines[i] = [newValue, ...lines[i]];
        }
    }
    console.log(lines[0][0]);
    return lines[0][0]
}).reduce((prev, curr) => prev + curr, 0);

console.log(result)








