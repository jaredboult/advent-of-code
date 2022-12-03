import { readBasicInput, sum } from "../helperFunctions.ts";

const rucksacks = readBasicInput().split("\n");

function getPriority(char: string): number{
    const codePoint = char.codePointAt(0);
    if (codePoint !== undefined && codePoint >= 65 && codePoint <= 90){
        return codePoint - 38;
    } else if (codePoint !== undefined && codePoint >= 97 && codePoint <= 122){
        return codePoint - 96;
    }
    return 0;
}

function findOutlier(contents: string): string{
    const arr = contents.split("");
    const left = new Set(arr.slice(0, arr.length / 2));
    const right = new Set(arr.slice(arr.length / 2));
    for (const element of left){
        if (right.has(element)){
            return element;
        }
    }
    return "";
}

const result = sum(
    rucksacks.map(contents => getPriority(findOutlier(contents))
));

console.log(result);
