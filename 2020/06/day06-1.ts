import { readInput, sum } from '../helperFunctions.ts';

const answerGroups = readInput()
    .split('\n\n')
    .map(group => {
        const results = new Set<string>();
        group
            .split("")
            .filter((char) => char.charCodeAt(0) > 32)
            .forEach((letter) => results.add(letter));
        return results.size;
    });


console.log(sum(answerGroups));