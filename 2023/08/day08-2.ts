import {readInput} from "../helperFunctions.ts";

const [time, distance] = readInput()
    .split("\n")
    .map(line => line
        .split(":")[1]
        .trim()
        .split(/\s+/)
        .reduce((prev, curr) => prev + curr, "")
    ).map(str => Number.parseInt(str, 10));

console.log(time, distance);

let wins = 0;
for (let i = 0; i < time; i++) {
    if(findDistance(i, time) > distance) wins++;
}
console.log(wins);

function findDistance(button: number, time:number) {
    const timeLeft = time - button;
    return button * timeLeft;
}
