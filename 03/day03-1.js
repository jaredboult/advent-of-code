const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split("\n");

console.log(input);

const array = input.map(x => x.split("").map(Number));

const counts = [];
for (let i = 0; i < array[0].length; i++) {
    let sum = 0;
    for (let j = 0; j < array.length; j++) {
        sum += array[j][i];
    }
    counts.push(sum);
}

const gamma_bits = [];
const epilson_bits = [];
for (const sum of counts) {
    const g_value = sum > array.length/2 ? 1 : 0;
    const e_value = sum > array.length/2 ? 0 : 1;
    gamma_bits.push(g_value);
    epilson_bits.push(e_value);
}

console.log("Gamma in binary\n", gamma_bits);
console.log("Epsilon in binary\n", epilson_bits);

let convertToDecimal = (array) => {
    let num = 0;
    for (let i = 0; i < array.length; i++){
        num += array[i] * 2**(array.length - 1 - i);
    }
    return num;
}

let gamma = convertToDecimal(gamma_bits);
let epilson = convertToDecimal(epilson_bits);

console.log(gamma);
console.log(epilson);
console.log(gamma * epilson)