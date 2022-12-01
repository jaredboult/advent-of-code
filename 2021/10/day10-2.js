const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split("\n");

let isCorrupted = line => {
    const chars = line.split('');
    const stack = [];
    let position = 0;
    chars.forEach((char, index) => {
        if (char === '(' || char === '[' || char === '{' || char === '<') {
            stack.push(char);
        } else {
            switch (char) {
                case ')':
                    if (stack.pop() !== '(') position = index;
                    break;
                case ']':
                    if (stack.pop() !== '[') position = index;
                    break;
                case '}':
                    if (stack.pop() !== '{') position = index;
                    break;
                case '>':
                    if (stack.pop() !== '<') position = index;
                    break;
            }
        }
    })
    return Boolean(position);
}

let autocomplete = line => {
    const chars = line.split('');
    const stack = [];
    let result = '';
    chars.forEach(char => {
        if (char === '(' || char === '[' || char === '{' || char === '<') {
            stack.push(char);
        } else stack.pop(); 
    })
    while (stack.length > 0) {
        switch (stack.pop()){
            case '(':
                result = result + ')';
                break;
            case '[':
                result = result + ']';
                break;
            case '{':
                result = result + '}';
                break;
            case '<':
                result = result + '>';
                break;    
        }
    }
    return result;
}

const charScores = {};
charScores[')'] = 1;
charScores[']'] = 2;
charScores['}'] = 3;
charScores['>'] = 4;

let scoreLine = line => {
    const chars = line.split('');
    return chars.reduce((p,c) => p*5 + charScores[c], 0)
}

const lineScores = input.filter(line => !isCorrupted(line))
                    .map(line => autocomplete(line))
                    .map(line => scoreLine(line))
                    .sort((a,b) => a - b);
console.log(lineScores);
const middle = Math.floor(lineScores.length/2);
const middleScore = lineScores.slice(middle, middle+1)[0];
console.log(middleScore);