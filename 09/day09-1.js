const fs = require('fs');
const input = fs.readFileSync("input.txt")
                .toString()
                .split("\n")
                .map(x => x.split('')
                           .map(Number));

const max_width = input[0].length-1;
const max_height = input.length-1;

// console.log(input);

class Point {
    constructor (row, col, height){
        this.row = row;
        this.col = col;
        this.height = height;
        this.neighbours = [];
    }

    addNeighbour(point){
        this.neighbours.push(point);
    }

    getRisk(){
        return 1 + this.height;
    }

    isLowestNeighbour() {
        let lowestSoFar = true;
        this.neighbours.forEach(n => {
            lowestSoFar = lowestSoFar && this.isLowerThan(n);
        })
        return lowestSoFar;
    }

    isLowerThan(neighbour) {
        return this.height < neighbour.height;
    }

    toString() {
        return "x:" + this.col + " y:" + this.row;
    }
}

const allPoints = {};
for(let row = 0; row < input.length; row++){
    for (let col = 0; col < input[row].length; col++){
        const point = new Point(row, col, input[row][col]);
        allPoints[point.toString()] = point;
    }
}

let calculateNeighbours = (p) => {
    if (p.row < max_height){
        // add neighbour below
        const below = allPoints['x:' + p.col + ' y:' + (p.row + 1)];
        p.addNeighbour(below);
    }
    if (p.row > 0){
        // add neighbour above
        p.addNeighbour(allPoints['x:' + p.col + ' y:' + (p.row - 1)]);
    }
    if (p.col < max_width){
        // add neighbour right
        p.addNeighbour(allPoints['x:' + (p.col + 1) + ' y:' + p.row]);
    }
    if (p.col > 0){
        // add neighbour left
        p.addNeighbour(allPoints['x:' + (p.col - 1) + ' y:' + p.row]);
    }
}

Object.values(allPoints).forEach(p => calculateNeighbours(p));
const lowPoints = Object.values(allPoints).filter(p => p.isLowestNeighbour());
const result = lowPoints.reduce((p, c) => p + c.getRisk(), 0);

console.log(result);