const fs = require('fs');

class Cave {
    constructor(label) {
        this.label = label;
        this.big = label.toUpperCase() === label;
        this.adjacent = new Set();
        this.visited = false;
        if (this.label === 'start' || this.label === 'end' || !this.big) {
            this.visitsLeft = 1;
        }
    }

    toString() {
        return this.label;
    }
}

const input = fs.readFileSync('input.txt').toString().split('\n');

const caves = new Map();
new Set(input
    .flatMap((e) => e.split('-')))
    .forEach((c) => caves.set(c, new Cave(c)));

input.forEach((edge) => {
    const [from, to] = edge.split('-');
    const fromCave = caves.get(from);
    const toCave = caves.get(to);
    fromCave.adjacent.add(toCave);
    toCave.adjacent.add(fromCave);
});

const simplePaths = new Set();
const currentPath = [];

function depthFirstSearch(u, v) {
    if (u.visited) return;
    if (!u.big) {
        u.visitsLeft -= 1;
        if (u.visitsLeft === 0) u.visited = true;
    }
    currentPath.push(u);
    if (u === v) {
        simplePaths.add([...currentPath]
            .map((c) => c.toString())
            .reduce((prev, curr) => prev + curr, ''));
        if (!u.big) {
            u.visitsLeft += 1;
            if (u.visitsLeft) u.visited = false;
        }
        currentPath.pop();
        return;
    }
    u.adjacent.forEach((a) => depthFirstSearch(a, v));
    currentPath.pop();
    if (!u.big) {
        u.visitsLeft += 1;
        if (u.visitsLeft) u.visited = false;
    } else {
        u.visited = false;
    }
}

const smallCaves = Array.from(caves.values()).filter((c) => !c.big && !(c.label === 'start' || c.label === 'end'));
smallCaves.forEach((s) => {
    s.visitsLeft += 1;
    depthFirstSearch(caves.get('start'), caves.get('end'));
    smallCaves.forEach((r) => {
        r.visitsLeft = 1;
        r.visited = false;
    });
});

// console.log(simplePaths);
console.log(simplePaths.size);
