import crChart from '../reference/cr-chart.json';

const crChartMappings : CrChartMapping[] = crChart;

// interface for the "get value" callback function
export interface GetValueFunction {
    (mapping: CrChartMapping): number
}

export interface CrChartMapping{
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

// MonsterCalc.java -> guessCR
// todo
export function guessCr() {

}