import {readInput, sum} from "../helperFunctions.ts";

const input = readInput().split('\n');

let VALID_DIGITS = {};
for (let i = 1; i < 10; i++){
    VALID_DIGITS[i.toString()] = i;
}
VALID_DIGITS = {...VALID_DIGITS,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

const values = input.map(x => getCalibrationValue(x));
const answer = sum(values);
console.log(answer);

function getCalibrationValue(input: string){
    let firstDigitIndex = Number.MAX_VALUE;
    let firstDigitResult = "";
    let lastDigitIndex = -1;
    let lastDigitResult = "";
    Object.keys(VALID_DIGITS).forEach(key => {
        const currentFirstIndex = input.indexOf(key);
        if(currentFirstIndex !== -1 && currentFirstIndex < firstDigitIndex){
            firstDigitIndex = currentFirstIndex;
            firstDigitResult = key;
        }
        const currentLastIndex = input.lastIndexOf(key);
        if(currentLastIndex > lastDigitIndex){
            lastDigitIndex = currentLastIndex;
            lastDigitResult = key;
        }
    });
    return Number("" + VALID_DIGITS[firstDigitResult] + VALID_DIGITS[lastDigitResult]);
}
