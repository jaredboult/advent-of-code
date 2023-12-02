export const readInput = (filename = "./input.txt") => {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(Deno.readFileSync(filename));
};

export const readTestInput = (filename = "./input-test.txt") => {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(Deno.readFileSync(filename));
};

export const sum = (numArray: number[]) => numArray.reduce((acc, curr) => acc + curr, 0);

export const product = (numArray: number[]) =>
  numArray.reduce((acc, curr) => acc * curr, 1);

export const sortNumbers = (numArray: number[], descending = true) => {
  return descending ? numArray.sort((a, b) => b - a) : numArray.sort((a, b) => a - b);
};

export const binaryStringToNumber = (input: string) => {
  const array = input.split("").map((x) => Number(x));
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i] * 2 ** (array.length - 1 - i);
  }
  return result;
};

export const numberToBinaryString = (input: number) => {
  if (input < 0) throw new Error("Does not work with negative numbers");
  return input.toString(2);
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
