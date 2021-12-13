const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split("\n");

const draw = input[0].split(",").map(Number);
const boards = splitBoards(input.slice(2));
const marks = storeMarks(boards);

playGame(draw);

function splitBoards(arr) {
    const perGroup = 6;
    const numGroups = arr.length / perGroup;
    return new Array(numGroups)
        .fill('')
        .map((_, i) => arr
            .slice(i * perGroup, (i+1) * perGroup - 1)
            .map(x => x
                .trim()
                .replace(/  +/g, ' ')
                .split(" ")
                .map(Number)
            )
        );
}

function storeMarks(arr) {
    return arr.map(() => Array.from(Array(5).fill(false), () => new Array(5).fill(false)));
}

function playGame(nums) {
    let bingoIndexes = new Set(); 
    for (const num of nums) {
        for (let i = 0; i < boards.length; i++) {
            if(bingoIndexes.has(i)) continue;
            const truthTable = checkForNumber(num, boards[i]);
            marks[i] = updateMarks(marks[i], truthTable);
            if(checkForBingo(marks[i])) {
                console.log("Bingo! Board: ", boards[i], " Number: ", num);
                console.log("Score: ", scoreBoard(i, num))
                bingoIndexes = bingoIndexes.add(i);
            }
        }
    }
}

function checkForNumber(num, board) {
    return board
        .map(row => row
            .map(col => col === num)
        );
}

function updateMarks(marks, update) {
    const newMarks = [...marks];
    for (let y = 0; y < newMarks.length; y++) {
        for (let x = 0; x < newMarks[y].length; x++) {
            newMarks[y][x] = newMarks[y][x] || update[y][x];
        }
    }
    return newMarks;
}

function checkForBingo(marks) {
    for (const row of marks) {
        if (row.reduce((a, i) => a && i, true)) return true;
    }
    for (let i = 0; i < marks[0].length; i++) {
        const col = marks.map(x => x[i]);
        if (col.reduce((a, i) => a && i, true)) return true;
    }
}

function scoreBoard(index, num) {
    const bingoBoard = [...boards[index]];
    const marksBoard = [...marks[index]];
    let total = 0;
    for (let y = 0; y < bingoBoard.length; y++) {
        for (let x = 0; x < bingoBoard[y].length; x++) {
            total += marksBoard[y][x] ? 0 : bingoBoard[y][x];
        }
    }
    return total * num;
}

