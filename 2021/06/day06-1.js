class Fish {
    constructor(timer) {
        this.timer = timer;
    }

    giveBirth() {
        babies.push(new Fish(8));
    }

    progress() {
        if(this.timer === 0) {
            this.giveBirth();
            this.timer = 6;
        }
        else this.timer--;
    }
}

function schoolToString() {
    return school.reduce((p, c) => p + c.timer.toString());
}

const fs = require('fs');
const input = fs.readFileSync("input.txt").toString().split(",").map(Number);
let school = input.map(l => new Fish(l));
let babies = [];

let days = 80;
while(days > 0) {
    school.forEach(f => f.progress());
    school = school.concat(babies);
    // console.log(schoolToString());
    babies = [];
    days--;
}

console.log(school.length);


