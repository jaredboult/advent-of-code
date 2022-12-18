import { readInput } from "../helperFunctions.ts";

function solveProblem() {
  const sensors = parseInput();
  const position = findBeacon(sensors, 0, 4000000);
  console.log(position);
  if (position !== undefined) {
    const result = position.x * 4000000 + position.y;
    console.log(result);
  }
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

function getManhattanDistanceBetweenPoints(a: Point, b: Point) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

class Sensor {
  ownPosition: Point;
  beaconPosition: Point;

  constructor(position: Point, beacon: Point) {
    this.ownPosition = position, this.beaconPosition = beacon;
  }

  getPerimeterPoints() {
    const points: Point[] = [];
    const distance = this.getManhattanDistanceFromBeacon() + 1;
    let counter = distance;
    while (counter) {
      if (counter === distance) {
        const y = this.ownPosition.y;
        const leftX = this.ownPosition.x - counter;
        const rightX = this.ownPosition.x + counter;
        points.push({
          x: leftX,
          y: y,
        }, {
          x: rightX,
          y: y,
        });
      } else {
        const topY = this.ownPosition.y - (distance - counter);
        const bottomY = this.ownPosition.y + (distance - counter);
        const leftX = this.ownPosition.x - counter;
        const rightX = this.ownPosition.x + counter;
        points.push({
          x: leftX,
          y: topY,
        }, {
          x: rightX,
          y: topY,
        }, {
          x: leftX,
          y: bottomY,
        }, {
          x: rightX,
          y: bottomY,
        });
      }
      counter--;
    }
    return points;
  }

  isPointInsideSensorRange(point: Point) {
    return getManhattanDistanceBetweenPoints(this.ownPosition, point) <=
      this.getManhattanDistanceFromBeacon();
  }

  getManhattanDistanceFromBeacon() {
    return getManhattanDistanceBetweenPoints(
      this.ownPosition,
      this.beaconPosition,
    );
  }
}

function findBeacon(sensors: Sensor[], min: number, max: number) {
  for (const sensor of sensors) {
    const perimeterPoints = sensor.getPerimeterPoints()
      .filter((point) =>
        point.x >= min &&
        point.x <= max &&
        point.y >= min &&
        point.y <= max
      );
    for (const point of perimeterPoints) {
      let insideSensorRange = false;
      for (const otherSensor of sensors) {
        if (otherSensor !== sensor) {
          insideSensorRange = insideSensorRange ||
            otherSensor.isPointInsideSensorRange(point);
        }
        if (insideSensorRange) {
          break;
        }
      }
      if (!insideSensorRange) {
        return point;
      }
    }
  }
  return undefined;
}

solveProblem();
