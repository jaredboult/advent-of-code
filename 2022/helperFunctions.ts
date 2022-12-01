export const readBasicInput = (filename = "input.txt") => {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(Deno.readFileSync(filename));
}

export const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr);

export const binaryStringToNum = (s: string) => {
    const array = s.split("").map((x) => Number(x));
    let num = 0;
    for (let i = 0; i < array.length; i++) {
        num += array[i] * 2 ** (array.length - 1 - i);
    }
    return num;
};
