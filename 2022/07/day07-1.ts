import { readBasicInput, sum } from "../helperFunctions.ts";

class Node {
  name: string;
  parent: Node | null;
  children: Node[] | null;

  constructor(name: string, parent: Node | null) {
    this.name = name;
    this.parent = parent;
    this.children = [];
  }

  addParent(parent: Node) {
    if (!this.parent) {
      this.parent = parent;
    }
  }

  addChild(node: Node) {
    if (this.children !== null) {
      this.children.push(node);
    }
  }

  getTotalSize(): number {
    if (this.children === null || !this.children.length) {
      return 0;
    }
    return sum(this.children?.map((child) => child.getTotalSize()));
  }
}

class File extends Node {
  size: number;

  constructor(name: string, parent: Node, size: number) {
    super(name, parent);
    this.size = size;
    this.children = null;
  }

  getTotalSize() {
    return this.size;
  }
}

function constructFilesystemTree(inputs: string[][]) {
  const root: Node = new Node("", null);
  let currentNode = root;

  inputs.forEach((command) => {
    const actionToTake = getCommandAction(command);
    if (actionToTake !== undefined) {
      currentNode = actionToTake(command, currentNode);
    }
  });
  return root.children?.at(0);
}

function getCommandAction(arr: string[]) {
  if (arr === undefined) return;
  const commandName = arr.at(0)?.split(" ").at(0);
  switch (commandName) {
    case "cd":
      return changeDirectory;
    case "ls":
      return list;
  }
  return;
}

const directories: Node[] = [];

function changeDirectory(command: string[], currentNode: Node): Node {
  const directoryName = command.at(0)?.split(" ").at(1) ?? "no_name";
  if (directoryName === ".." && currentNode.parent) {
    return currentNode.parent;
  }
  const existingDirectory = currentNode.children?.find((node) =>
    node.name === directoryName
  );
  if (existingDirectory) {
    return existingDirectory;
  }
  const child = new Node(directoryName, currentNode);
  currentNode.addChild(child);
  directories.push(child);
  return child;
}

function list(command: string[], tree: Node): Node {
  const output = command.slice(1);
  output.forEach((o) => {
    const [a, b] = o.split(" ");
    if (a === "dir") {
      const child = new Node(b, tree);
      tree.addChild(child);
      directories.push(child);
    } else {
      tree.addChild(new File(b, tree, Number(a)));
    }
  });
  return tree;
}

const inputs = readBasicInput()
  .trim()
  .split("$")
  .map((i) => i.trim().split("\n"))
  .slice(1);

constructFilesystemTree(inputs);
const result = sum(
  directories
    .map((d) => d.getTotalSize())
    .filter((s) => s <= 100000),
);
console.log(result);
