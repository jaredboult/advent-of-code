import { readInput, sum } from '../helperFunctions.ts';

const answerGroups = readInput()
    .split('\n\n')
    .map(group => {
        let results = new Set<string>();
        group
            .split("\n")
            .forEach((line, index) => {
                const currentSet = new Set<string>();
                line.trim().split("").forEach(char => currentSet.add(char));
                if (index !== 0){
                    results = results.intersection(currentSet);
                } else {
                    results = results.union(currentSet);
                }
            });
        return results.size;
    });


console.log(sum(answerGroups));