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

const validGames = games.map(game => ({...game, valid: isGamePossible(game)}))
    .filter(game => game.valid)
    .map(game => game.id);
console.log(sum(validGames));


function isGamePossible(game){
    const maxValues = {
        red: 12,
        green: 13,
        blue: 14
    }

    const isEachTurnValid = Object.keys(game).map(key => {
        if(key === "id") return;
        const colourTotals = game[key];
        let valid= true;
        Object.keys(colourTotals).forEach(colour => {
            valid = valid && (maxValues[colour] >= colourTotals[colour]);
        });
        return valid;
    })

    return !isEachTurnValid.includes(false);

}