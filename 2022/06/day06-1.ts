import { readBasicInput } from "../helperFunctions.ts";

const inputs = readBasicInput().split("\n");
const results = inputs.map((i) => findStartOfPacketMarker(i));

function findStartOfPacketMarker(datastream: string) {
  const sizeOfMarker = 4;
  for (let i = sizeOfMarker; i < datastream.length; i++) {
    const uniqueChars = new Set(datastream.slice(i - sizeOfMarker, i));
    if (uniqueChars.size === sizeOfMarker) return i;
  }
}

console.log(results);
