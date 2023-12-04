import {readInput} from "../helperFunctions.ts";

interface Scratchcard {
    id: number,
    winningNumbers: number[],
    guessingNumbers: number[],
    copies: number
}
const cardMap = new Map<number, Scratchcard>();

readInput()
    .split('\n')
    .forEach(line => {
        const [prefix, numbers] = line.split(": ");
        const id = Number.parseInt(prefix.trim().split(/\s+/).at(1) ?? "", 10);
        const [winningNumbers, guessingNumbers] = numbers.trim().split(" | ");
        cardMap.set(id, {
            id: id,
            winningNumbers: winningNumbers.trim().split(/\s+/).map(n => Number.parseInt(n, 10)),
            guessingNumbers: guessingNumbers.trim().split(/\s+/).map(n => Number.parseInt(n, 10)),
            copies: 1
        })
    });
cardMap.forEach(card => {
    let loops = card.copies;
    while(loops){
        let newCopies = totalMatches(card.guessingNumbers, card.winningNumbers);
        while(newCopies){
            const copy = cardMap.get(card.id + newCopies);
            if(copy){
                copy.copies++;
            }
            newCopies--;
        }
        loops--;
    }
})

const result = Array.from(cardMap.values())
    .map(c => c.copies)
    .reduce((acc, curr) => acc + curr, 0);

console.log(result);

function totalMatches(arr1: number[], arr2: number[]): number {
    const a = new Set(arr1);
    const b = new Set(arr2);
    return new Set(
        [...a].filter(x => b.has(x))
    ).size;
}