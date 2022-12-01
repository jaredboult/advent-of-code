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
            this.neighbours.push(map.get("x: " + this.x + " y: " + (this.y-1)));
            if(this.x > 0) this.neighbours.push(map.get("x: " + (this.x-1) + " y: " + (this.y-1)));
            if(this.x < 9) this.neighbours.push(map.get("x: " + (this.x+1) + " y: " + (this.y-1))); 
        }
        if(this.y < 9) {
            this.neighbours.push(map.get("x: " + this.x + " y: " + (this.y+1)));
            if(this.x > 0) this.neighbours.push(map.get("x: " + (this.x-1) + " y: " +  (this.y+1)));
            if(this.x < 9) this.neighbours.push(map.get("x: " + (this.x+1) + " y: " +  (this.y+1)));
        }
        if(this.x > 0) this.neighbours.push(map.get("x: " + (this.x-1) + " y: " + this.y));
        if(this.x < 9) this.neighbours.push(map.get("x: " + (this.x+1) + " y: " + this.y));
    }

    addEnergy() {
        this.energy++;
    }

    resetEnergy() {
        this.energy = 0;
    }

    flash() {
        this.flashed = true;
        this.neighbours.forEach(n => n.addEnergy());
    }

    toString() {
        return String(this.energy);
    }
}

const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split("\n");
const octopi = new Map();
input.forEach((row, rowIndex)  => {
    row.split('')
        .map(Number)
        .forEach((energy, colIndex) => {
            const key = "x: " + colIndex + " y: " + rowIndex;
            octopi.set(key, new Octopus(colIndex, rowIndex, energy));
        })
})
octopi.forEach((o, _) => o.addNeighbours(octopi));

let printOctopi = map => {
    const size = Math.sqrt(map.size);
    for (let y = 0; y < size; y++) {
        let row = '';
        for (let x = 0; x < size; x++) {
            const key = "x: " + x + " y: " + y;
            row = row + map.get(key).toString();
        }
        console.log(row);
    }
    console.log("");
}

let flashes = 0;
let steps = 100;
printOctopi(octopi);
while (steps) {
    // increase energy level by 1
    octopi.forEach((o, _) => o.addEnergy());
    
    let readyToFlash = Array.from(octopi.values()).filter(o => o.energy > 9 && !o.flashed);
    
    while(readyToFlash.length) {
        // flashing increases the energy of all neighbours by 1
        // if the neighbour now has energy > 9, it can flash if it has not already flashed
        readyToFlash.forEach(o => o.flash());
        flashes += readyToFlash.length;
        readyToFlash = Array.from(octopi.values()).filter(o => o.energy > 9 && !o.flashed);
    }
    Array.from(octopi.values()).filter(o => o.flashed).forEach(o => {
        o.resetEnergy();
        o.flashed = false;
    });
    // any octopus that has flashed during the step has its energy set to 0
    // if (!(steps % 10)) printOctopi(octopi);
    steps--;
}

console.log(flashes);




