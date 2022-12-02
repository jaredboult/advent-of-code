import { readBasicInput, sum } from "../helperFunctions.ts";

const rounds = readBasicInput().split("\n");

const totalScore = sum(rounds.map(r => getScore(r)));

function getScore(round: string){
    const winScore = 6;
    const drawScore = 3;
    const lossScore = 0;
    const rockScore = 1;
    const paperScore = 2;
    const scissorsScore = 3;
    
    const [opponent, myself] = round.split(" ");
    let result = 0;
    switch (opponent){
        case "A":
            switch (myself){
                case "X":
                    result = lossScore + scissorsScore;
                    break;
                case "Y":
                    result = drawScore + rockScore;
                    break;
                case "Z":
                    result = winScore + paperScore;
                    break;
            }
            break;
        case "B":
            switch (myself){
                case "X":
                    result = lossScore + rockScore;
                    break;
                case "Y":
                    result = drawScore + paperScore;
                    break;
                case "Z":
                    result = winScore + scissorsScore;
                    break;
            }
        break;
        case "C":
            switch (myself){
                case "X":
                    result = lossScore + paperScore;
                    break;
                case "Y":
                    result = drawScore + scissorsScore;
                    break;
                case "Z":
                    result = winScore + rockScore;
                    break;
            }
        break;
    }
    return result;
}

console.log(totalScore);

// A = "rock"
// B = "paper"
// C = "scissors"

// X = "loss"
// Y = "draw"
// Z = "win"

// rock = 1
// paper = 2
// scissors = 3

// loss = 0
// draw = 3
// win = 6




