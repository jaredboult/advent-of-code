class Node {
    constructor(x, y, risk) {
        this.x = x;
        this.y = y;
        this.risk = risk;
        this.neighbours = [];
    }

    addNeighbours(map, maxXIndex, maxYIndex) {
        if (this.y > 0) this.neighbours.push(map.get(`x: ${this.x} y: ${this.y - 1}`));
        if (this.y < maxYIndex) this.neighbours.push(map.get(`x: ${this.x} y: ${this.y + 1}`));
        if (this.x > 0) this.neighbours.push(map.get(`x: ${this.x - 1} y: ${this.y}`));
        if (this.x < maxXIndex) this.neighbours.push(map.get(`x: ${this.x + 1} y: ${this.y}`));
    }

    getKey() {
        return `x: ${this.x} y: ${this.y}`;
    }
}

const createNodes = (input) => {
    const nodes = new Map();
    for (let y = 0; y < input.length; y += 1) {
        for (let x = 0; x < input[0].length; x += 1) {
            const distance = Number(input[y][x]);
            const key = `x: ${x} y: ${y}`;
            const node = new Node(x, y, distance);
            nodes.set(key, node);
        }
    }
    return nodes;
};

const dijkstra = (graph, source, target) => {
    const unvisited = new Map();
    graph.forEach((node, key) => {
        node.distance = Number.POSITIVE_INFINITY;
        unvisited.set(key, node);
    });
    source.distance = 0;
    source.risk = 0;
    while (unvisited.size) {
        console.log(unvisited.size);
        const v = Array
            .from(unvisited
                .values())
            .sort((a, b) => b.distance - a.distance)
            .pop();
        if (v === target) return;
        unvisited.delete(v.getKey());
        v.neighbours.forEach((u) => {
            if (!unvisited.has(u.getKey())) return;
            const alt = v.distance + v.risk;
            if (alt < u.distance) u.distance = alt;
        });
    }
};

const hrstart = process.hrtime();
const fs = require('fs');

const input = fs
    .readFileSync('input.txt')
    .toString()
    .split('\n')
    .map((row) => row.split(''));
const maxYIndex = input.length - 1;
const maxXIndex = input[maxYIndex].length - 1;

const allNodes = createNodes(input);
allNodes.forEach((n) => n.addNeighbours(allNodes, maxXIndex, maxYIndex));

const sourceNode = allNodes.get('x: 0 y: 0');
const targetNode = allNodes.get(`x: ${maxXIndex} y: ${maxYIndex}`);
dijkstra(allNodes, sourceNode, targetNode);

const lowestDistance = targetNode.distance + targetNode.risk;
console.log(lowestDistance);
const hrend = process.hrtime(hrstart);
console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
