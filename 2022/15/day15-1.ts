import { readInput } from "../helperFunctions.ts";

function solveProblem() {
  const sensors = parseInput();
  const answer = calculateRow(sensors, 2000000);
  console.log(answer);
}

function parseInput() {
  return readInput()
    .split("\n")
    .map((sensorAndBeacon) =>
      sensorAndBeacon
        .split(": ")
        .map((item) => {
          const xStart = item.indexOf("x=") + 2;
          const xEnd = item.indexOf(",");
          const yStart = item.indexOf("y=") + 2;
          return {
            x: Number(item.slice(xStart, xEnd)),
            y: Number(item.slice(yStart)),
          };
        })
    ).map((x) => new Sensor(x[0], x[1]));
}

interface Point {
  x: number;
  y: number;
}

class Sensor {
  ownPosition: Point;
  beaconPosition: Point;

  constructor(position: Point, beacon: Point) {
    this.ownPosition = position, this.beaconPosition = beacon;
  }

  getXValuesWhereBeaconIsNot(row: number) {
    const numberOfRowsFromBeacon = Math.abs(this.ownPosition.y - row);
    const manhattan = this.getManhattanDistance();
    const minX = this.ownPosition.x - (manhattan - numberOfRowsFromBeacon);
    const maxX = this.ownPosition.x + (manhattan - numberOfRowsFromBeacon);
    const result: number[] = [];
    for (let i = minX; i <= maxX; i++) {
      result.push(i);
    }
    return result;
  }

  getManhattanDistance() {
    return Math.abs(this.ownPosition.x - this.beaconPosition.x) +
      Math.abs(this.ownPosition.y - this.beaconPosition.y);
  }
}

function calculateRow(sensors: Sensor[], row: number) {
  const positionsOnRow: Set<number> = new Set();
  for (const sensor of sensors) {
    sensor.getXValuesWhereBeaconIsNot(row).forEach((x) =>
      positionsOnRow.add(x)
    );
  }
  sensors
    .filter((s) => s.beaconPosition.y === row)
    .forEach((s) => positionsOnRow.delete(s.beaconPosition.x));
  return positionsOnRow.size;
}

solveProblem();
