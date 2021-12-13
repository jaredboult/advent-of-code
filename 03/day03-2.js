const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split("\n");

const arr = input.map(x => x.split("").map(Number));
const og_rating = convertToDecimal(findRating(arr, true));
const co2_rating = convertToDecimal(findRating(arr, false));

console.log("Oxygen generator: ", og_rating);
console.log("C02 scrubber: ", co2_rating);
console.log(og_rating * co2_rating);

function getCounts(array) {
    const counts = [];
    for (let i = 0; i < array[0].length; i++) {
        let sum = 0;
        for (let j = 0; j < array.length; j++) {
            sum += array[j][i];
        }
        counts.push(sum);
    }
    return counts;
}

function findRating(array, most_common) {
    let result = [...array];
    for (let i = 0; i < array[0].length; i++) {
        const counts = getCounts(result);
        let value = null;
        if (most_common){
            value = counts[i] >= result.length/2 ? 1 : 0;
        } else {
            value = counts[i] >= result.length/2 ? 0 : 1;
        }
        result = result.filter(x => x[i] === value);
        if(result.length === 1) return result[0];
    }
}

function convertToDecimal(array) {
    let num = 0;
    for (let i = 0; i < array.length; i++){
        num += array[i] * 2**(array.length - 1 - i);
    }
    return num;
}
