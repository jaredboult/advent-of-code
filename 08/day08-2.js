let findPermutations = (string) => {
    if (!string || typeof string !== "string"){
      return "Please enter a string"
    } else if (string.length < 2 ){
      return string
    }
  
    let permutationsArray = [] 
     
    for (let i = 0; i < string.length; i++){
      let char = string[i]
  
      if (string.indexOf(char) != i)
      continue
  
      let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)
  
      for (let permutation of findPermutations(remainingChars)){
        permutationsArray.push(char + permutation) }
    }
    return permutationsArray
}

const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split("\n");
const signals = input
                .flatMap(x => x.split(" | ").slice(0,1));
const outputs = input
                .flatMap(x => x.split(" | ").slice(1))
                .map(x => x.split(" "));


const normal = 'abcdefg';              

let translateNumbers = (p) => {
    const result = [];
    result.push(p.slice(0,3) + p.slice(4));                      // 0
    result.push(p.slice(2,3) + p.slice(5,6));                    // 1
    result.push(p.slice(0,1) + p.slice(2,5) + p.slice(6));       // 2
    result.push(p.slice(0,1) + p.slice(2,4) + p.slice(5));       // 3
    result.push(p.slice(1,4) + p.slice(5,6));                    // 4
    result.push(p.slice(0,2) + p.slice(3,4) + p.slice(5));       // 5
    result.push(p.slice(0,2) + p.slice(3))                       // 6
    result.push(p.slice(0,1) + p.slice(2,3) + p.slice(5,6));     // 7
    result.push(p);                                              // 8
    result.push(p.slice(0,4) + p.slice(5));                      // 9
    return result;
}

const isEqual = (array1, array2) => {
   return (array1.length === array2.length) && (array1.every(val => array2.includes(val)));
}

let findMatchingPattern = (signal) => {
    const signals = signal.split(" ");
    for (const pattern of findPermutations(normal)) {
        const translations = translateNumbers(pattern);
        let allMatch = 0;
        translations.forEach(x => {
            let anyMatch = false;
            const splitX = x.split('');
            signals.forEach(s => {
                const splitS = s.split('');
                anyMatch = anyMatch || isEqual(splitX, splitS);
            })
            if (anyMatch) allMatch++;
        })
        if (allMatch === signals.length) return pattern;
    }
}

const matchingPatterns = signals.map(s => findMatchingPattern(s));
console.log(matchingPatterns);

let evaluateOuput = (output, index) => {
    const translations = translateNumbers(matchingPatterns[index]);
    let numAsString = '';
    output.forEach(o => {
        const splitO = o.split('');
        translations.forEach((t,i) => {
            const splitT = t.split('');
            if (isEqual(splitT, splitO)) numAsString += i;
        })
    })
    return Number(numAsString);
}

const finalAnswer = outputs.reduce((p,c,i) => p + evaluateOuput(c,i), 0);
console.log(finalAnswer);

