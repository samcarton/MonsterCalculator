import * as crChart from '../reference/cr-chart.json';

// interface for the "get value" callback function
export interface GetValueFunction {
    (mapping: any): number
}

export interface ScaleAttributeArgs {
    attributeValue: number,
    challengeRatingInput: number,
    challengeRatingToScaleTo: number,
    getValueFunction: GetValueFunction
}

// MonsterCalc.java -> updateFields
// Scale the input attribute based on the given CR ratings.
export function scaleAttribute(arg : ScaleAttributeArgs) {
    let inputCrMapping = {};// TODO lookup in cr-chart by input CR
    let inputCrMaxAttributeValue = arg.getValueFunction(inputCrMapping);

    let targetCrMapping = {}; // TODO lookup in cr-chart by target CR
    let targetCrMaxAttributeValue = arg.getValueFunction(inputCrMapping);

    let scaledAttribute = arg.attributeValue/inputCrMaxAttributeValue * targetCrMaxAttributeValue;
    return scaledAttribute;
}

// MonsterCalc.java -> guessCR
// todo
export function guessCr() {

}