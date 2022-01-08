class Pair {
    constructor(left, right, depth) {
        this.left = left;
        this.right = right;
        this.depth = depth;
        if (depth === 5) this.explode();
        // The + 3 is for the brackets [] and comma and ,
        this.length = left.toString().length + right.toString().length + 3;
    }

    addParent(parent) {
        this.parent = parent;
    }

    explode() {
        // 
    }

    needsToSplit() {
        return this.leftNeedsSplit() || this.rightNeedsSplit();
    }

    leftNeedsSplit() {
        return typeof this.left === 'number' && this.left > 9;
    }

    rightNeedsSplit() {
        return typeof this.right === 'number' && this.right > 9;
    }

    leftSplit() {
        const newLeft = Math.floor(this.left / 2);
        const newRight = Math.round(this.left / 2);
        this.left = new Pair(newLeft, newRight, this.depth + 1);
    }

    rightSplit() {
        const newLeft = Math.floor(this.right / 2);
        const newRight = Math.round(this.right / 2);
        this.right = new Pair(newLeft, newRight, this.depth + 1);
    }

    recursiveSplit() {
        if (typeof this.left === 'object') this.left.recursiveSplit();
        else if (this.leftNeedsSplit()) this.leftSplit();
        if (typeof this.right === 'object') this.right.recursiveSplit();
        else if (this.rightNeedsSplit()) this.rightSplit();
    }

    toString() {
        return `[${this.left.toString()},${this.right.toString()}]`;
    }
}

function parseElem(arr, depth = 0) {
    let elem = null;
    if (arr.at(0) === '[') {
        // eslint-disable-next-line no-use-before-define
        elem = parsePair(arr.join(''), depth + 1);
    } else {
        const slice = arr.slice(0, arr.indexOf(']'));
        elem = Number(slice
            .join('')
            .split(',')
            .shift());
    }
    return elem;
}

function parsePair(str, depth = 0) {
    const arr = str.split('');
    if (arr.at(0) !== '[') throw new Error('No opening bracket found');
    arr.shift(); // remove the first opening bracket [
    const left = parseElem(arr, depth);
    arr.splice(0, left.toString().length + 1); // + 1 for the comma
    const right = parseElem(arr, depth);
    const firstBracketIndex = arr.indexOf(']');
    arr.splice(firstBracketIndex, 1); // remove the first closing bracket
    const pair = new Pair(left, right, depth);
    if (typeof pair.left !== 'number') pair.left.addParent(pair);
    if (typeof pair.right !== 'number') pair.right.addParent(pair);
    return pair;
}

function addPairs(left, right) {
    return new Pair(left, right);
}

// *** TEST PARSING ***

// const test1 = '[1,2]';
// console.log(parsePair(test1).toString() === test1);

// const test2 = '[[1,2],3]';
// console.log(parsePair(test2).toString() === test2);

// const test3 = '[9,[8,7]]';
// console.log(parsePair(test3).toString() === test3);

// const test4 = '[[1,9],[8,5]]';
// console.log(parsePair(test4).toString() === test4);

// const test5 = '[[[[1,2],[3,4]],[[5,6],[7,8]]],9]';
// console.log(parsePair(test5).toString() === test5);

// const test6 = '[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]';
// console.log(parsePair(test6).toString() === test6);

// const test7 = '[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]';
// console.log(parsePair(test7).toString() === test7);

// *** TEST ADDITION ***

// const test8 = '[[[[1,1],[2,2]],[3,3]],[4,4]]';
// const result = ['[1,1]', '[2,2]', '[3,3]', '[4,4]']
//     .reduce((p, c) => addPairs(p, parsePair(c)))
//     .toString();
// console.log(result === test8);

// *** TEST SPLIT ***

// const pair9 = parsePair('[15,[0,13]]');
// console.log(pair9.needsToSplit() === true);

// const test10 = '[[7,8],[0,13]]';
// const pair10 = parsePair('[15,[0,13]]');
// pair10.split();
// const result = pair10.toString();
// console.log(result === test10);
// console.log(pair10.needsToSplit() === false);

// const test11 = '[[7,8],[0,[6,7]]]';
// const pair11 = parsePair('[15,[0,13]]');
// pair11.recursiveSplit();
// const result = pair11.toString();
// console.log(result === test11);

// *** TEST EXPLODE ***
