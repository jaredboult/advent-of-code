class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return "x: " + this.x + " y: " + this.y;
    }
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    getAllPoints() {
        if(this.p1.x === this.p2.x) {
            const y_values = this.p1.y < this.p2.y ? range(this.p1.y, this.p2.y) : range(this.p2.y, this.p1.y);
            return y_values.map(y => new Point(this.p1.x, y));
        } else if (this.p1.y === this.p2.y) {
            const x_values = this.p1.x < this.p2.x ? range(this.p1.x, this.p2.x) : range(this.p2.x, this.p1.x);
            return x_values.map(x => new Point(x, this.p1.y));
        } else {
            const x_values = range(this.p1.x, this.p2.x)
            const y_values = range(this.p1.y, this.p2.y);
            return x_values.map((e, i) => new Point(e, y_values[i]));
        }
    }

    isHorizontalOrVertical() {
        return this.p1.x === this.p2.x || this.p1.y === this.p2.y;
    }
}

function range(start, end) {
    if (start > end) {
        return [...Array(start - end + 1).keys()].reverse().map(x => x + end);
    }
    return [...Array(end - start + 1).keys()].map(x => x + start);
}

function convertToLine(string) {
    const nums = string
        .replace(" -> ", ",")
        .split(",")
        .map(Number)
    const p1 = new Point(nums[0], nums[1]);
    const p2 = new Point(nums[2], nums[3]);
    return new Line(p1, p2);
}

function updateDiagram(point) {
    const key = point.toString();
    if (diagram.has(key)) {
        let value = diagram.get(key);
        diagram = diagram.set(key, value + 1);
    } else {
        diagram = diagram.set(key, 1);
    }
}

const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split("\n");
const lines = input.map(l => convertToLine(l));
let diagram = new Map();

lines
    .forEach(l => l.getAllPoints()
    .forEach(p => updateDiagram(p)));

const result = Array.from(diagram.values())
                    .filter(v => v >= 2)
                    .length;

console.log(result);


