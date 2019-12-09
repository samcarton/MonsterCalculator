import * as fs from 'fs';

const tableFile = "../../resources/tables/cr chart.txt";
const outPath = "../src/reference/";
const outFile = outPath + "cr-chart.json";

let file = fs.readFileSync(tableFile,'utf8');

let lines = file.split("\r\n");

let challengeRatingChartObjects = lines.map((line)=> {
    let splitLine = line.split(",");
    return {challengeRating: parseFloat(splitLine[0]),
        proficiencyBonus: parseInt(splitLine[1]),
        armorClass: parseInt(splitLine[2]),
        hitPoints: parseInt(splitLine[3]),
        attackBonus: parseInt(splitLine[4]),
        damagePerRound: parseInt(splitLine[5]),
        saveDifficultyCheck: parseInt(splitLine[6])
    }
});

let jsonString = JSON.stringify(challengeRatingChartObjects,null, 2);
console.log(`saving to ${outFile}`, jsonString);

try {
    fs.mkdir(outPath,null,(err) => {});
}
catch{}
fs.writeFileSync(outFile, jsonString);
