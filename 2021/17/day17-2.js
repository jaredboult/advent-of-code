class Probe {
    constructor(velocityX, velocityY){
        this.x = 0;
        this.y = 0;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    step() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.velocityX > 0) this.velocityX--;
        else if (this.velocityX < 0) this.velocityX++;
        this.velocityY--;
    }

    equals(probe) {
        return this.velocityX === probe.velocityX &&
                this.velocityY === probe.velocityY;
    }
}

const inputTest = "target area: x=20..30, y=-10..-5";
const input = "target area: x=155..182, y=-117..-67";

const ranges = [];
input.slice(13)
    .split(", ")
    .forEach((r) => {
        const values = r.split("..");
        const min = Number(values[0].slice(2));
        const max = Number(values[1]);
        ranges.push(min, max);
    });

function inTargetArea(probe) {
    return probe.x >= ranges[0] && 
        probe.x <= ranges[1] &&
        probe.y >= ranges[2] &&
        probe.y <= ranges[3];
}

function goneTooFar(probe) {
    return probe.y < ranges[2] || probe.x > ranges[1];
};

const successes = [];
for (let x = 0; x < 183; x++){
    for (let y = -200; y < 200; y++){
        const probe = new Probe(x, y);
        while(!inTargetArea(probe) && !goneTooFar(probe)){
            probe.step();
        }
        if(inTargetArea(probe)){
            successes.push(probe);
        }
    }
}
console.log(successes.length);