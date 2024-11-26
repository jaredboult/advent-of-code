import { readInput } from '../helperFunctions.ts';

const input = readInput()
    .split('\n')
    .filter(line => {
        const [firstIndex, secondIndex] = line.split(" ")[0].split("-").map(x => Number(x) - 1);
        const letter = line.split(" ")[1].slice(0, 1);
        const password = line.split(": ")[1];

        return (password[firstIndex] === letter && password[secondIndex] !== letter) 
        || (password[firstIndex] !== letter && password[secondIndex] === letter);
    });

console.log(input.length);