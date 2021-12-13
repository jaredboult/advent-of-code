const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split("\n");

const outputs = input
                .flatMap(x => x.split(" | ").slice(1))
                .map(x => x.split(" "));

let total = 0;
for (let i=0; i < outputs.length; i++){
    for (const o of outputs[i]) {
        switch (o.length) {
            case 2:
                total++;
                break;
            case 3:
                total++;
                break;
            case 4:
                total++;
                break;
            case 7:
                total++;
                break;
            default:
                break;
        }
    }
}

console.log(outputs);
console.log(total)


