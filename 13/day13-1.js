const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split("\n");
const dots = new Map();
const folds = [];

initialiseDotsAndFolds(input, folds, dots);
console.log(dots);
console.log(folds);

folds.forEach((x, i) => {
    foldDots(x, dots);
    console.log(`Fold ${i}: ${dots.size}`);
});

function initialiseDotsAndFolds(input, folds, dots){
    input.forEach(line => {
        // Ensure no empty lines are processed
        if (!line) return;
        // Process the points
        if (line.includes(",")) {
            const [x, y] = line.split(",");
            const key = `x:${x} y:${y}`;
            const point = {
                'x': Number(x),
                'y': Number(y)
            };
            dots.set(key, point);
        } else {
            // Process the folds
            let [direction, lineNum] = line.split("=");
                lineNum = Number(lineNum);
                direction = direction.slice(-1);
                const fold = {
                    'direction': direction,
                    'line': lineNum
                }
            folds.push(fold);
        }
    });
}

function foldDots(fold, dots) {
    dots.forEach((v, k) => {
        if(fold.direction === 'x') {
            if(v.x > fold.line) {
                v.x = v.x - ((v.x - fold.line) * 2);
                dots.delete(k);
                const newKey = `x:${v.x} y:${v.y}`;
                dots.set(newKey, v);
            }
        } else {
            if(v.y > fold.line) {
                v.y = v.y - ((v.y - fold.line) * 2);
                dots.delete(k);
                const newKey = `x:${v.x} y:${v.y}`;
                dots.set(newKey, v);
            }
        }
    })
}
