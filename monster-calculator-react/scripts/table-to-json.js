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
    return { challengeRating: parseFloat(splitLine[0]),
        proficiencyBonus: parseInt(splitLine[1]),
        armorClass: parseInt(splitLine[2]),
        hitPoints: parseInt(splitLine[3]),
        attackBonus: parseInt(splitLine[4]),
        damagePerRound: parseInt(splitLine[5]),
        saveDifficultyCheck: parseInt(splitLine[6])
    };
});
var jsonString = JSON.stringify(challengeRatingChartObjects, null, 2);
console.log("saving to " + outFile, jsonString);
try {
    fs.mkdir(outPath, null, function (err) { });
}
catch (_a) { }
fs.writeFileSync(outFile, jsonString);
