import { readInput } from "../helperFunctions.ts";

const [instructions, network] = readInput().split("\n\n");

interface Node {
    name: string,
    left: Node | undefined,
    right: Node | undefined
}

const nodes = new Map<string, Node>();

network.split('\n')
    .forEach(n => {
        const [name, neighbours] = n.split(" = ");
        const [leftName, rightName] = neighbours.slice(1, -1).split(", ");
        const node = retrieveOrCreateNode(name);
        node.left = retrieveOrCreateNode(leftName);
        node.right = retrieveOrCreateNode(rightName);
    })

function retrieveOrCreateNode(name: string): Node{
    if (nodes.has(name)) return nodes.get(name)!;
    const newNode = {
        name: name,
        left: undefined,
        right: undefined
    };
    nodes.set(name, newNode);
    return newNode;
}

const individualSteps : number[] = [];
let nodesInProgress = Array.from(nodes.entries())
    .filter(([key, _]) => key.endsWith("A"))
    .map(([_, value]) => value);
let steps = 0;

nodesInProgress.forEach(n => {
    steps = 0;
    let currentNode = n;
    do {
        const direction = instructions.at(steps % instructions.length);
        if (direction === "R"){
            currentNode = currentNode.right!;
        } else {
            currentNode = currentNode.left!;
        }
        steps++;
    } while(!currentNode.name.endsWith("Z"));
    individualSteps.push(steps);
});

const lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
};

console.log(lcm(...individualSteps));