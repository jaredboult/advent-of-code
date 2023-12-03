import {readInput, sum} from "../helperFunctions.ts";

const gamesRawData = readInput().split('\n');

const COLOURS = ["red", "green", "blue"];

const games = gamesRawData.map(x => {
    const id = x.split(": ")[0].split(" ")[1];
    const subsets = x.split(": ")[1].split("; ");
    const totals = subsets.map(s => {
        const singleColourCounts = s.split(", ");
        const turnTotals: any = {};
        singleColourCounts.forEach(c => {
            COLOURS.forEach(col => {
                if(c.includes(col)){
                    turnTotals[col] = Number(c.split(" ")[0]);
                }
            })
        })
        return turnTotals;
    })

    return {id: Number(id), ...totals};
})

const minValuedGames = games.map(game => ({...game, minValues: findMinValues(game)}));
console.log(sum(minValuedGames.map(x => x.minValues.red * x.minValues.green * x.minValues.blue)));

function findMinValues(game){
    const minValues: any = {
        red: 0,
        green: 0,
        blue: 0
    }

    Object.keys(game).forEach(key => {
        if(key === "id") return;
        const colourTotals = game[key];
        Object.keys(colourTotals).forEach(colour => {
            if(minValues[colour] < colourTotals[colour]){
                minValues[colour] = colourTotals[colour]
            }
        });

    })
    return minValues;
}