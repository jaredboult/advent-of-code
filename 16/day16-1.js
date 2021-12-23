const hexCharToBinaryString = (char) => {
    let num = parseInt(char, 10);
    if (isNaN(num)) {
        num = char.charCodeAt(0) - 55;
    }
    return num.toString(2).padStart(4, '0');
}

const hexStringToBinaryString = (str) => {
    return str
            .split('')
            .map(c => hexCharToBinaryString(c))
            .reduce((p, c) => p + c);
}

const getVersion = (str) => parseInt(str.slice(0,3), 2);

const getTypeId = (str) => parseInt(str.slice(3,6), 2);

const isOperator = (str) => getTypeId(str) === 4;

const getLiteralValue = (str) => {
    let nextPrefix = str.slice(6,7);
    let sliceStart = 7;
    let sliceEnd = 11;
    let binary = hexStringToBinaryString(str.slice(sliceStart,sliceEnd));
    while (nextPrefix) {
        sliceStart = sliceEnd;
        sliceEnd += 4;
        binary += hexStringToBinaryString(str.slice(sliceStart,sliceEnd));
    }
    return parseInt(binary, 2);
}

const example1 = 'D2FE28';
const binaryExample1 = hexStringToBinaryString(example1);
console.log(getVersion(binaryExample1));
console.log(getTypeId(binaryExample1));
console.log(getLiteralValue(binaryExample1));