import { readBasicInput } from "../helperFunctions.ts";

const rucksacks = readBasicInput().split("\n");

const numberOfGroups = rucksacks.length / 3;

let result = 0;
for (let i = 0; i < numberOfGroups; i++){
    result += getPriority(findBadge(rucksacks.slice(i*3, i*3+3)));
}
console.log(result);

function getPriority(char: string) {
    const codePoint = char.codePointAt(0);
    if (codePoint !== undefined && codePoint >= 65 && codePoint <= 90){
        return codePoint - 38;
    } else if (codePoint !== undefined && codePoint >= 97 && codePoint <= 122){
        return codePoint - 96;
    }
    return 0;
}

function findBadge(arr: string[]) {
    const setsArr = arr.map(x => new Set(x.split('')));
    for (const element of setsArr[0]){
        if (setsArr[1].has(element) && setsArr[2].has(element)){
            return element;
        }
    }
    return "";
}
