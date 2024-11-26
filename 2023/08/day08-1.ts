import {readInput} from "../helperFunctions.ts";

const arrays = readInput()
    .split("\n")
    .map(line => line
        .split(":")[1]
        .trim()
        .split(/\s+/)
        .map(str => Number.parseInt(str, 10))
    );

const races = arrays[0].map((time, index) => ({
    time: time,
    distance: arrays[1][index]
}))

const waysToWin = races.map(race => {
    let wins = 0;
    for (let i = 0; i < race.time; i++) {
        if(findDistance(i, race.time) > race.distance) wins++;
    }
    return wins;
});

const answer = waysToWin.reduce((prev, curr) => prev * curr, 1);
console.log(answer);

function findDistance(button: number, time:number) {
    const timeLeft = time - button;
    return button * timeLeft;
}
