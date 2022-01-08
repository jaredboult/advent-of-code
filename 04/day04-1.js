const fs = require('fs');

function splitBoards(arr) {
    const perGroup = 6;
    const numGroups = arr.length / perGroup;
    return new Array(numGroups)
        .fill('')
        .map((_, i) => arr
            .slice(i * perGroup, (i + 1) * perGroup - 1)
            .map((x) => x
                .trim()
                .replace(/  +/g, ' ')
                .split(' ')
                .map(Number)));
}

function storeMarks(arr) {
    return arr.map(() => Array.from(Array(5).fill(false), () => new Array(5).fill(false)));
}

function playGame(nums) {
    for (const num of nums) {
        for (let i = 0; i < boards.length; i++) {
            const truthTable = checkForNumber(num, boards[i]);
            marks[i] = updateMarks(marks[i], truthTable);
            if(checkForBingo(marks[i])) {
                console.log("Bingo! Board: ", boards[i], " Number: ", num);
                console.log("Score: ", scoreBoard(i, num))
                return;
            }
        }
    }
}

function checkForNumber(num, board) {
    return board
        .map((row) => row
            .map((col) => col === num));
}

function updateMarks(marks, update) {
    const newMarks = [...marks];
    for (let y = 0; y < newMarks.length; y += 1) {
        for (let x = 0; x < newMarks[y].length; x += 1) {
            newMarks[y][x] = newMarks[y][x] || update[y][x];
        }
    }
    return newMarks;
}

function checkForBingo(marks) {
    const bingoRow = marks.some((row) => row.reduce((prev, curr) => prev && curr, true));
    if (bingoRow) return true;
    for (let i = 0; i < marks[0].length; i += 1) {
        const col = marks.map((x) => x[i]);
        if (col.reduce((p, c) => p && c, true)) return true;
    }
    return false;
}

function scoreBoard(index, num) {
    const bingoBoard = [...boards[index]];
    const marksBoard = [...marks[index]];
    let total = 0;
    for (let y = 0; y < bingoBoard.length; y += 1) {
        for (let x = 0; x < bingoBoard[y].length; x += 1) {
            total += marksBoard[y][x] ? 0 : bingoBoard[y][x];
        }
    }
    return total * num;
}

const input = fs.readFileSync('input.txt').toString().split('\n');

const draw = input[0].split(',').map(Number);
const boards = splitBoards(input.slice(2));
const marks = storeMarks(boards);

playGame(draw);
