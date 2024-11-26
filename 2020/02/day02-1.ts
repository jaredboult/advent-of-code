import { readInput } from '../helperFunctions.ts';

const input = readInput()
    .split('\n')
    .filter(line => {
        const [min, max] = line.split(" ")[0].split("-").map(x => Number(x));
        const letter = line.split(" ")[1].slice(0, 1);
        const password = line.split(": ")[1];

        let occurrences = 0;
        password.split("").forEach(char => {
            if (char === letter) occurrences++;
        })
        return min <= occurrences && max >= occurrences;
    });

console.log(input.length);