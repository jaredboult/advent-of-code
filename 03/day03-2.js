const fs = require('fs');

function getCounts(array) {
    const counts = [];
    for (let i = 0; i < array[0].length; i += 1) {
        let sum = 0;
        for (let j = 0; j < array.length; j += 1) {
            sum += array[j][i];
        }
        counts.push(sum);
    }
    return counts;
}

function findRating(array, mostCommon) {
    let result = [...array];
    for (let i = 0; i < array[0].length; i += 1) {
        const counts = getCounts(result);
        let value = null;
        if (mostCommon) {
            value = counts[i] >= result.length / 2 ? 1 : 0;
        } else {
            value = counts[i] >= result.length / 2 ? 0 : 1;
        }
        result = result.filter((x) => x[i] === value);
        if (result.length === 1) break;
    }
    return result[0];
}

function convertToDecimal(array) {
    let num = 0;
    for (let i = 0; i < array.length; i += 1) {
        num += array[i] * 2 ** (array.length - 1 - i);
    }
    return num;
}

const input = fs.readFileSync('input.txt').toString().split('\n');

const arr = input.map((x) => x.split('').map(Number));
const ogRating = convertToDecimal(findRating(arr, true));
const co2Rating = convertToDecimal(findRating(arr, false));

console.log('Oxygen generator: ', ogRating);
console.log('C02 scrubber: ', co2Rating);
console.log(ogRating * co2Rating);
