export const readInput = (filename = "./input.txt") => {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(Deno.readFileSync(filename));
};

export const readTestInput = (filename = "./input-test.txt") => {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(Deno.readFileSync(filename));
};

export const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

export const product = (arr: number[]) =>
  arr.reduce((acc, curr) => acc * curr, 1);

export const sortNumbers = (arr: number[], descending = true) => {
  return descending ? arr.sort((a, b) => b - a) : arr.sort((a, b) => a - b);
};

export const binaryStringToNumber = (s: string) => {
  const array = s.split("").map((x) => Number(x));
  let num = 0;
  for (let i = 0; i < array.length; i++) {
    num += array[i] * 2 ** (array.length - 1 - i);
  }
  return num;
};

export const numberToBinaryString = (n: number) => {
  if (n < 0) throw new Error("Does not work with negative numbers");
  return n.toString(2);
};

export const printGrid = (grid: string[][]) => {
  const height = grid.length;
  const width = grid[0].length;
  for (let i = height - 1; i >= 0; i--) {
    let row = "";
    for (let j = 0; j < width; j++) {
      row = row.concat(grid[i][j], " ");
    }
    console.log(row);
  }
  console.log("\n");
};
