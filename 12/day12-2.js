class Cave {
    constructor(label) {
        this.label = label;
        this.big = label.toUpperCase() === label;
        this.adjacent = new Set();
        this.visited = false;
        if(this.label === 'start' || this.label === 'end' || !this.big){
            this.visitsLeft = 1;
        }
    }

    toString() {
        return this.label;
    }
}

const fs = require('fs');
const input = fs.readFileSync('input-test.txt').toString().split("\n");

const caves = new Map();
new Set(input
        .flatMap(e => e.split('-')))
    .forEach(c => caves.set(c, new Cave(c)));

input.forEach(edge => {
    const [from, to] = edge.split('-');
    const fromCave = caves.get(from);
    const toCave = caves.get(to);
    fromCave.adjacent.add(toCave);
    toCave.adjacent.add(fromCave);
});

const graph = [...caves.values()];
let simplePaths = [];
const currentPath = [];

const smallCaves = graph.filter(c => !c.big && !(c.label === 'start' || c.label === 'end'));
smallCaves.forEach(s => {
    s.visitsLeft++;
    depthFirstSearch(caves.get('start'), caves.get('end'));
    graph.forEach(c => c.visited = false);
    s.visitsLeft--;
});

function depthFirstSearch(u, v) {
    if (u.visited) return;
    if (!u.big) {
        u.visitsLeft--;
        if (!u.visitsLeft) u.visited = true;
    } 
    currentPath.push(u);
    if (u === v) {
        simplePaths.push([...currentPath].map(c => c.toString()));
        console.log(simplePaths);
        if (!u.big) {
            u.visitsLeft++;
            if (u.visitsLeft) u.visited = false;
        }
        currentPath.pop();
        return;
    }
    u.adjacent.forEach(a => depthFirstSearch(a, v));
    currentPath.pop();
    if (!u.big) {
        u.visitsLeft++;
        if (u.visitsLeft) u.visited = false;
    } else {
        u.visited = false;
    }
}

simplePaths = simplePaths.flat(3);
console.log(simplePaths);
console.log(simplePaths.length);