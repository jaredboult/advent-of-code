class Probe {
    constructor(velocityX, velocityY){
        this.x = 0;
        this.y = 0;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.maxY = 0;
    }

    step(){
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.velocityX > 0) this.velocityX--;
        else this.velocityX++;
        this.velocityY--;
        if (this.y > this.maxY) this.maxY = this.y;
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

// console.log(ranges);

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
for (let x = 1; x < 1000; x++){
    for (let y = 1; y < 1000; y++){
        const probe = new Probe(x, y);
        while(!inTargetArea(probe) && !goneTooFar(probe)){
            probe.step();
        }
        if(inTargetArea(probe)){
            successes.push(probe);
        }
    }
}

successes.sort((a, b) => b.maxY - a.maxY);
console.log(successes[0].maxY);