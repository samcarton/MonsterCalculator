"use strict";
exports.__esModule = true;
var fs = require("fs");
var tableFile = "../../resources/tables/cr chart.txt";
var outPath = "../src/reference/";
var outFile = outPath + "cr-chart.json";
var file = fs.readFileSync(tableFile, 'utf8');
var lines = file.split("\r\n");
var challengeRatingChartObjects = lines.map(function (line) {
    var splitLine = line.split(",");
    return { challengeRating: splitLine[0],
        proficiencyBonus: splitLine[1],
        armorClass: splitLine[2],
        hitPoints: splitLine[3],
        attackBonus: splitLine[4],
        damagePerRound: splitLine[5],
        saveDifficultyCheck: splitLine[6]
    };
});
var jsonString = JSON.stringify(challengeRatingChartObjects, null, 2);
console.log("saving to " + outFile, jsonString);
fs.mkdir(outPath, null, function (err) { if (err)
    throw err; });
fs.writeFileSync(outFile, jsonString);
