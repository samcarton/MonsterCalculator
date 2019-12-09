import crChart from '../reference/cr-chart.json';

const crChartMappings : CrChartMapping[] = crChart;

const attributeNames : string[] = [
    "proficiencyBonus",
"armorClass",
"hitPoints",
"attackBonus",
"damagePerRound",
"saveDifficultyCheck"];

// interface for the "get value" callback function
export interface GetValueFunction {
    (mapping: CrChartMapping): number
}

export interface CrChartMapping{
    [index: string]: number;
    challengeRating:number,
    proficiencyBonus:number,
    armorClass:number,
    hitPoints:number,
    attackBonus:number,
    damagePerRound:number,
    saveDifficultyCheck:number
}

export interface ScaleAttributeArgs {
    attributeValue: number,
    challengeRatingInput: number,
    challengeRatingToScaleTo: number,
    getValueFunction: GetValueFunction
}

// MonsterCalc.java -> updateFields
// Scale the input attribute based on the given CR ratings.
export function ScaleAttribute(arg : ScaleAttributeArgs) : number {

    let inputCrMapping = crChartMappings.find(mapping => mapping.challengeRating === arg.challengeRatingInput);
    if(!inputCrMapping)
    {
        console.log("Input CR mapping not found");
        return -1;
    }

    let inputCrMaxAttributeValue = arg.getValueFunction(inputCrMapping);

    let targetCrMapping = crChartMappings.find(mapping => mapping.challengeRating === arg.challengeRatingToScaleTo);

    if(!targetCrMapping)
    {
        console.log("Target CR mapping not found");
        return -1;
    }

    let targetCrMaxAttributeValue = arg.getValueFunction(targetCrMapping);

    let scaledAttribute = arg.attributeValue/inputCrMaxAttributeValue * targetCrMaxAttributeValue;
    return Math.round(scaledAttribute);
}

export interface GuessCrArgs {
    [index: string]: number;
    proficiencyBonus:number,
    armorClass:number,
    hitPoints:number,
    attackBonus:number,
    damagePerRound:number,
    saveDifficultyCheck:number
}

// MonsterCalc.java -> GuessCR
// Given the inputted attributes, try to guess what the CR would be based on the cr-chart table CR for each attribute.
export function GuessCr(arg : GuessCrArgs) : number {
    // for each input attribute,
    // get the CR mapping entry where the matching attribute value is greater than or equal to the input value (if there are multiple equal attribute values, use the one with the maximum CR).
    //   If there is no entry, assume a max CR of 30
    // collect the CRs of these levels, then average based on the number of found CRs
    const defaultMaxCr = 30;
    let numberToAverageBy = 0;
    let totalCr = 0;

    attributeNames.forEach(attributeName => {
        console.log(attributeName, arg[attributeName]);
        if(arg[attributeName])    {
            let largerEntries = crChartMappings.filter(mapping => mapping[attributeName] >= arg[attributeName]);
            if(largerEntries && largerEntries.length > 0){
                let nextLargerEntries = largerEntries.filter(mapping => mapping[attributeName] === largerEntries[0][attributeName]);
                let maxMappingEntry = nextLargerEntries[nextLargerEntries.length-1];
                totalCr += maxMappingEntry.challengeRating;
            } else {
                totalCr += defaultMaxCr;
            }
            numberToAverageBy += 1;
        }
    });

    if(numberToAverageBy > 0){
        console.log("average CR:", totalCr/numberToAverageBy);
        let averageCr = totalCr/numberToAverageBy;
        let closestCrMapping = crChartMappings.find(mapping => mapping.challengeRating >= averageCr);
        if(closestCrMapping){
            console.log("closest mapped CR:", closestCrMapping.challengeRating);
            return closestCrMapping.challengeRating;
        }
    }

    return 0;
}