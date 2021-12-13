function initialiseSchool(num) {
    if(school.has(num)){
        school = school.set(num, school.get(num) + 1);
    } else {
        school.set(num, 1);
    }
}

function updateSchool(keys) {
    let newSchool = new Map();
    const sorted = Array.from(keys).sort();
    for (const num of sorted){
        if(num === 0){
            newSchool = newSchool.set(8, school.get(num));
            newSchool = newSchool.set(6, school.get(num));
        } else if(num === 7) {
            if (newSchool.has(6)){
                newSchool = newSchool.set(6, school.get(num) + newSchool.get(6));
            } else {
                newSchool = newSchool.set(6, school.get(num));
            }
        } else {
            newSchool = newSchool.set(num-1, school.get(num))
        }
    }
    return newSchool;
}

const fs = require('fs');
let school = new Map();
const input = fs.readFileSync("input.txt").toString().split(",").map(Number).forEach(l => initialiseSchool(l))

// console.log(school);

let days = 256;
while(days > 0) {
    school = updateSchool(school.keys());
    days--;
}

let total = 0;
Array.from(school.values()).forEach(x => total = x + total);
console.log(total);


