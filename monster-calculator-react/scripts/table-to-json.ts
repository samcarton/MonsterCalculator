import * as fs from 'fs';

const tableFile = "../../resources/tables/cr chart.txt";
const outPath = "../src/reference/";
const outFile = outPath + "cr-chart.json";

let file = fs.readFileSync(tableFile,'utf8');

let lines = file.split("\r\n");

let challengeRatingChartObjects = lines.map((line)=> {
    let splitLine = line.split(",");
    return {challengeRating: splitLine[0],
        proficiencyBonus: splitLine[1],
        armorClass: splitLine[2],
        hitPoints: splitLine[3],
        attackBonus: splitLine[4],
        damagePerRound: splitLine[5],
        saveDifficultyCheck: splitLine[6]
    }
});

let jsonString = JSON.stringify(challengeRatingChartObjects,null, 2);
console.log(`saving to ${outFile}`, jsonString);

fs.mkdir(outPath,null,(err) => {if (err) throw err;});
fs.writeFileSync(outFile, jsonString);
