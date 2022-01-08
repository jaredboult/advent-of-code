const fs = require('fs');
const Heap = require('heap');

class Node {
    constructor(x, y, risk) {
        this.x = x;
        this.y = y;
        this.risk = risk;
        this.neighbours = [];
        this.visited = false;
    }

    addNeighbours(map) {
        const maxIndex = Math.sqrt(map.size) - 1;
        if (this.y > 0) this.neighbours.push(map.get(`x: ${this.x} y: ${this.y - 1}`));
        if (this.y < maxIndex) this.neighbours.push(map.get(`x: ${this.x} y: ${this.y + 1}`));
        if (this.x > 0) this.neighbours.push(map.get(`x: ${this.x - 1} y: ${this.y}`));
        if (this.x < maxIndex) this.neighbours.push(map.get(`x: ${this.x + 1} y: ${this.y}`));
    }

    getKey() {
        return `x: ${this.x} y: ${this.y}`;
    }
}

const createNodes = (input) => {
    const nodes = new Map();
    for (let y = 0; y < input.length; y += 1) {
        for (let x = 0; x < input[0].length; x += 1) {
            const risk = Number(input[y][x]);
            const key = `x: ${x} y: ${y}`;
            const node = new Node(x, y, risk);
            nodes.set(key, node);
        }
    }
    return nodes;
};

const expandNodesFiveTimes = (nodes) => {
    const currentSize = Math.sqrt(nodes.size);
    const widerMap = new Map(nodes);
    for (let i = 1; i < 5; i += 1) {
        nodes.forEach((n) => {
            const newX = n.x + i * currentSize;
            let newRisk = n.risk + i;
            if (newRisk > 9) newRisk -= 9;
            const node = new Node(newX, n.y, newRisk);
            widerMap.set(node.getKey(), node);
        });
    }
    const tallerMap = new Map(widerMap);
    for (let i = 1; i < 5; i += 1) {
        widerMap.forEach((n) => {
            const newY = n.y + i * currentSize;
            // const newRisk = n.risk === 9 ? 1 : n.risk + 1;
            let newRisk = n.risk + i;
            if (newRisk > 9) newRisk -= 9;
            const node = new Node(n.x, newY, newRisk);
            tallerMap.set(node.getKey(), node);
        });
    }
    return tallerMap;
};

// const nodesEqual = (a, b) => a.distance === b.distance;

const compareNodes = (a, b) => a.distance - b.distance;

const dijkstra = (graph, source) => {
    const unvisited = new Heap(compareNodes);
    graph.forEach((node) => {
        node.distance = Number.POSITIVE_INFINITY;
        unvisited.push(node);
    });
    source.distance = 0;
    source.risk = 0;
    unvisited.updateItem(source);

    while (unvisited.size()) {
        if (unvisited.size() % 100 === 0) {
            console.log(unvisited.size());
        }
        const v = unvisited.pop();
        // if (v === target) return;
        v.visited = true;
        v.neighbours.forEach((u) => {
            if (u.visited) return;
            const alt = v.distance + v.risk;
            if (alt < u.distance) {
                u.distance = alt;
                unvisited.updateItem(u);
            }
        });
    }
};

const printGraph = (graph) => {
    const width = Math.sqrt(graph.size);
    for (let y = 0; y < width; y += 1) {
        let row = '';
        for (let x = 0; x < width; x += 1) {
            row += graph.get(`x: ${x} y: ${y}`).risk;
        }
        console.log(row);
    }
};

const hrstart = process.hrtime();
const input = fs
    .readFileSync('input.txt')
    .toString()
    .split('\n')
    .map((row) => row.split(''));

let allNodes = createNodes(input);
printGraph(allNodes);
allNodes = expandNodesFiveTimes(allNodes);
// printGraph(allNodes);
const maxIndex = Math.sqrt(allNodes.size) - 1;
allNodes.forEach((n) => n.addNeighbours(allNodes));

const sourceNode = allNodes.get('x: 0 y: 0');
const targetNode = allNodes.get(`x: ${maxIndex} y: ${maxIndex}`);
dijkstra(allNodes, sourceNode, targetNode);

const lowestDistance = targetNode.distance + targetNode.risk;
console.log(lowestDistance);
const hrend = process.hrtime(hrstart);
console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
