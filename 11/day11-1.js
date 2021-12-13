class Octopus {
    constructor(x, y, energy){
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.flashed = false;
        this.neighbours = [];
    }

    addNeighbours(map){
        if(this.y > 0) {
            this.neighbours.add(map.get([this.x, this.y-1]));
            if(this.x > 0) this.neighbours.add(map.get([this.x-1, this.y-1]));
            if(this.x < 9) this.neighbours.add(map.get([this.x+1, this.y-1])); 
        }
        if(this.y < 9) {
            this.neighbours.add(map.get([this.x, this.y+1]));
            if(this.x > 0) this.neighbours.add(map.get([this.x-1, this.y+1]));
            if(this.x < 9) this.neighbours.add(map.get([this.x+1, this.y+1]));
        }
        if(this.x > 0) this.neighbours.add(map.get([this.x-1, this.y]));
        if(this.x < 9) this.neighbours.add(map.get([this.x+1, this.y]));
    }

    addEnergy() {
        if (this.flashed) return;
        if (this.energy < 9) this.energy++;
        else {
            this.energy = 0;
            this.flash();
        }
    }

    flash() {

    }

    toString() {
        return String(this.energy);
    }
}

const fs = require('fs');
const input = fs.readFileSync('input-test.txt').toString().split("\n");
const octopi = new Map();
input.forEach((row, rowIndex)  => {
    row.split('')
        .map(Number)
        .forEach((energy, colIndex) => {
            const key = "x: " + colIndex + " y: " + rowIndex;
            octopi.set(key, new Octopus(colIndex, rowIndex, energy));
        })
})

let printOctopi = map => {
    for (let y = 0; y < 10; y++) {
        let row = '';
        for (let x = 0; x < 10; x++) {
            const key = "x: " + x + " y: " + y;
            row = row + map.get(key).toString();
        }
        console.log(row);
    }
}


console.log(input);
printOctopi(octopi);

