class Node {
    constructor(x, y, risk) {
        this.x = x;
        this.y = y;
        this.risk = risk;
        this.neighbours = [];
    }

    addNeighbours(map){
        if(this.y > 0) this.neighbours.push(map.get(`x: ${this.x} y: ${this.y-1}`));
        if(this.y < 9) this.neighbours.push(map.get(`x: ${this.x} y: ${this.y+1}`));
        if(this.x > 0) this.neighbours.push(map.get(`x: ${this.x-1} y: ${this.y}`));
        if(this.x < 9) this.neighbours.push(map.get(`x: ${this.x+1} y: ${this.y}`));
    }

    getKey() {
        return `x: ${this.x} y: ${this.y}`;
    }
}

const createNodes = (input) => {
    const nodes = new Map();
    for (let y = 0; y < input.length; y++){
        for (let x = 0; x < input[0].length; x++){
            const distance = Number(input[y][x]);
            const key = `x: ${x} y: ${y}`;
            const node = new Node(x, y, distance);
            nodes.set(key, node);
        }
    }
    return nodes;
}

const dijkstra = (graph, source, target) => {
    const unvisited = new Map();
    const visited = new Map();
    graph.forEach((node, key) => {
        node.distance = Number.POSITIVE_INFINITY;
        unvisited.set(key, node);
    });
    source.distance = 0;
    const currentNode = source;
    
}

const fs = require('fs');
const input = fs
    .readFileSync('input-test.txt')
    .toString()
    .split("\n")
    .map(row => row.split(''));
const allNodes = createNodes(input);
allNodes.forEach(n => n.addNeighbours(allNodes));








