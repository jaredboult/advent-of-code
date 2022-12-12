import { product, readInput, sortNumbers } from "../helperFunctions.ts";

function solveProblem() {
  const inputs = readInput()
    .split("\n\n")
    .map((x) => x.split("\n"));

  const monkeys: Map<number, Monkey> = new Map();
  let lowestCommonMultiple = 1;
  inputs.forEach((i) => {
    const id = Number(i.at(0)?.split(" ").at(1)?.slice(0, -1));
    const items = i.at(1)?.split(":").at(1)?.trim().split(", ").map((x) =>
      new Item(Number(x))
    ) ?? [];
    const operationComponents = i.at(2)?.split("old ").at(1)?.split(" ");
    const operator = operationComponents?.at(0) ?? "";
    const operand = operationComponents?.at(1) ?? "";
    const divisor = Number(i.at(3)?.split("by ").at(1));
    lowestCommonMultiple *= divisor;
    const successMonkeyId = Number(i.at(4)?.split("monkey ").at(1));
    const failMonkeyId = Number(i.at(5)?.split("monkey ").at(1));
    monkeys.set(
      id,
      new Monkey(
        id,
        items,
        operator,
        operand,
        divisor,
        successMonkeyId,
        failMonkeyId,
      ),
    );
  });

  for (const monkey of monkeys.values()) {
    monkey.setAllMonkeys(monkeys);
    monkey.lowestCommonMultiple = lowestCommonMultiple;
  }
  console.log(monkeys.get(0)?.lowestCommonMultiple);

  const NUMBER_OF_ROUNDS = 10000;
  let counter = 1;
  const roundsToCheck = [
    1,
    20,
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
  ];
  while (counter <= NUMBER_OF_ROUNDS) {
    const numberOfMonkeys = monkeys.size;
    for (let i = 0; i < numberOfMonkeys; i++) {
      monkeys.get(i)?.takeTurn();
    }
    if (roundsToCheck.includes(counter)) {
      console.log(`== After round ${counter} ==`);
      for (let i = 0; i < numberOfMonkeys; i++) {
        monkeys.get(i)?.printItemInspectionCount();
      }
      console.log("\n...\n");
    }

    counter++;
  }

  const result = product(
    sortNumbers(
      Array.from(monkeys.values())
        .map((m) => m.inspectionsMade),
    ).slice(0, 2),
  );

  console.log(result);
}

class Monkey {
  id: number;
  items: Item[];
  operator: string;
  operand: string;
  divisor: number;
  succeedTest: number;
  failTest: number;
  allMonkeys: Map<number, Monkey>;
  inspectionsMade: number;
  lowestCommonMultiple: number;

  constructor(
    id: number,
    items: Item[],
    operator: string,
    operand: string,
    divisor: number,
    succeedTest: number,
    failTest: number,
  ) {
    this.id = id;
    this.items = items;
    this.operator = operator;
    this.operand = operand;
    this.divisor = divisor;
    this.succeedTest = succeedTest;
    this.failTest = failTest;
    this.allMonkeys = new Map();
    this.inspectionsMade = 0;
    this.lowestCommonMultiple = 1;
  }

  setAllMonkeys(map: Map<number, Monkey>) {
    this.allMonkeys = map;
  }

  performTest(item: Item) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    if (item.worry % this.divisor === 0) {
      this.throwItem(item, this.succeedTest);
    } else {
      this.throwItem(item, this.failTest);
    }
  }

  throwItem(item: Item, monkeyId: number) {
    this.allMonkeys.get(monkeyId)?.catchItem(item);
  }

  inspectItem(item: Item) {
    switch (this.operator) {
      case "+":
        if (this.operand === "old") {
          item.setWorry(item.worry + item.worry);
        } else {
          item.setWorry(item.worry + Number(this.operand));
        }
        break;
      case "*":
        if (this.operand === "old") {
          item.setWorry(item.worry * item.worry);
        } else {
          item.setWorry(item.worry * Number(this.operand));
        }
        break;
    }
    if (item.worry > this.lowestCommonMultiple) {
      item.setWorry(item.worry % this.lowestCommonMultiple);
    }
    this.inspectionsMade++;
  }

  catchItem(item: Item) {
    this.items.push(item);
  }

  takeTurn() {
    const itemsToInspect = [...this.items];
    for (const item of itemsToInspect) {
      this.inspectItem(item);
      this.performTest(item);
    }
  }

  printItemWorryLevels() {
    let output = `Monkey ${this.id}: `;
    for (const item of this.items) {
      output = output.concat(`${item.worry} `);
    }
    console.log(output);
  }

  printItemInspectionCount() {
    console.log(
      `Monkey ${this.id}: inspected items ${this.inspectionsMade} times.`,
    );
  }
}

class Item {
  worry: number;

  constructor(worry: number) {
    this.worry = worry;
  }

  setWorry(value: number) {
    this.worry = value;
  }
}

solveProblem();
