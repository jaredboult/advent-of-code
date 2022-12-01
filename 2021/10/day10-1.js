const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split("\n");

console.log(input);

let findCorrupted = line => {
    const chars = line.split('');
    const stack = []
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
    if (position) { 
        return chars[position];
    }
    return '';
}

const scores = {};
scores[')'] = 3;
scores[']'] = 57;
scores['}'] = 1197;
scores['>'] = 25137;

const result = input.map(line => findCorrupted(line))
                    .filter(char => char) // remove empty strings
                    .reduce((p, c) => p + scores[c], 0);
console.log(result);