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

let currentNode = nodes.get("AAA");
let steps = 0;
while(currentNode?.name != "ZZZ"){
    const direction = instructions.at(steps % instructions.length);
    if (direction === "R"){
        currentNode = currentNode?.right;
    } else {
        currentNode = currentNode?.left;
    }
    steps++;
}

console.log(steps)
