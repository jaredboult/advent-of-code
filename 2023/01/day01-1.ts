import {readInput, sum} from "../helperFunctions.ts";

const input = readInput().split('\n');

const values = input.map(x => {
    const chars = x.split('');
    const firstNumber = getFirstNumber(chars);
    const secondNumber = getFirstNumber(chars.toReversed());
    return Number("" + firstNumber + secondNumber);
});
const answer = sum(values);
console.log(answer);

function getFirstNumber (input: string[]){
    for (let i = 0; i < input.length; i++) {
        const num = Number.parseInt(input[i]);
        if (!isNaN(num)) {
            return num;
        }
    }
    return NaN;
}