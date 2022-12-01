const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n');

console.log(input);

const array = input.map((x) => x.split('').map(Number));

const counts = [];
for (let i = 0; i < array[0].length; i += 1) {
    let sum = 0;
    for (let j = 0; j < array.length; j += 1) {
        sum += array[j][i];
    }
    counts.push(sum);
}

const gammaBits = [];
const epilsonBits = [];
counts.forEach((sum) => {
    const gValue = sum > array.length / 2 ? 1 : 0;
    const eValue = sum > array.length / 2 ? 0 : 1;
    gammaBits.push(gValue);
    epilsonBits.push(eValue);
});

console.log('Gamma in binary\n', gammaBits);
console.log('Epsilon in binary\n', epilsonBits);

const convertToDecimal = (arr) => {
    let num = 0;
    for (let i = 0; i < arr.length; i += 1) {
        num += arr[i] * 2 ** (arr.length - 1 - i);
    }
    return num;
};

const gamma = convertToDecimal(gammaBits);
const epilson = convertToDecimal(epilsonBits);

console.log(gamma);
console.log(epilson);
console.log(gamma * epilson);
