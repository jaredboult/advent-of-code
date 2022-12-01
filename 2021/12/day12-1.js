const fs = require('fs');

class Cave {
    constructor(label) {
        this.label = label;
        this.big = label.toUpperCase() === label;
        this.adjacent = new Set();
        this.visited = false;
    }

    toString() {
        return this.label;
    }
}

const input = fs.readFileSync('input.txt').toString().split('\n');

const caves = new Map();
new Set(input.flatMap((e) => e.split('-')))
    .forEach((c) => caves.set(c, new Cave(c)));

input.forEach((edge) => {
    const [from, to] = edge.split('-');
    const fromCave = caves.get(from);
    const toCave = caves.get(to);
    fromCave.adjacent.add(toCave);
    toCave.adjacent.add(fromCave);
});

const simplePaths = [];
const currentPath = [];

function depthFirstSearch(u, v) {
    if (u.visited) return;
    if (!u.big) u.visited = true;
    currentPath.push(u);
    if (u === v) {
        simplePaths.push([...currentPath].map((c) => c.toString()));
        u.visited = false;
        currentPath.pop();
        return;
    }
    u.adjacent.forEach((a) => depthFirstSearch(a, v));
    currentPath.pop();
    u.visited = false;
}

depthFirstSearch(caves.get('start'), caves.get('end'));

console.log(simplePaths);
console.log(simplePaths.length);
