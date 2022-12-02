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
                    result = drawScore + rockScore;
                    break;
                case "Y":
                    result = winScore + paperScore;
                    break;
                case "Z":
                    result = lossScore + scissorsScore;
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
                    result = winScore + rockScore;
                    break;
                case "Y":
                    result = lossScore + paperScore;
                    break;
                case "Z":
                    result = drawScore + scissorsScore;
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

// X = "rock"
// Y = "paper"
// Z = "scissors"

// rock = 1
// paper = 2
// scissors = 3

// loss = 0
// draw = 3
// win = 6




