import {readInput, sum} from "../helperFunctions.ts";

const scratchcards = readInput()
    .split('\n')
    .map(line => {
        const [prefix, numbers] = line.split(": ");
        const id = prefix.split(" ").at(1);
        const [winningNumbers, guessingNumbers] = numbers.split(" | ");
        return {
            id: id,
            winningNumbers: winningNumbers.trim().split(/\s+/).map(n => Number.parseInt(n, 10)),
            guessingNumbers: guessingNumbers.trim().split(/\s+/).map(n => Number.parseInt(n, 10))
        }
    });

const points= scratchcards.map(card => {
    const matches = intersection(card.guessingNumbers, card.winningNumbers).length;
    if (matches === 0) return 0;
    return 2 ** (matches - 1);
})

console.log(sum(points));

function intersection(arr1: number[], arr2: number[]): number[] {
    const a = new Set(arr1);
    const b = new Set(arr2);
    return Array.from(new Set(
        [...a].filter(x => b.has(x))
    ));
}