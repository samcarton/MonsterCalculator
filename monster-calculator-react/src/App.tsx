import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {InputScaledOutput} from "./components/input-scaled-output";
import {CrChartMapping, ScaleAttribute, ScaleAttributeArgs} from "./services/monster-calculator-service";

const availableCrs = [0, 1 / 8, 1 / 4, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

const App: React.FC = () => {
    //#region CRs
    const [leftCr, setLeftCr] = useState<number>(0);
    const [rightCr, setRightCr] = useState<number>(0);

    const handleLeftCrChange = (event:ChangeEvent<HTMLSelectElement>) => {
        setLeftCr(parseFloat(event.target.value));
        console.log("left cr changed to ", event.target.value);
    };

    const handleRightCrChange = (event:ChangeEvent<HTMLSelectElement>) => {
        setRightCr(parseFloat(event.target.value));
        console.log("right cr changed to ", event.target.value);
    };
    //#endregion

    //#region Attribute State
    const [inputPb, setInputPb] = useState<number>(1);
    const [scaledPb, setScaledPb] = useState<number>(1);

    const [inputAc, setInputAc] = useState<number>(1);
    const [scaledAc, setScaledAc] = useState<number>(1);

    const [inputHp, setInputHp] = useState<number>(1);
    const [scaledHp, setScaledHp] = useState<number>(1);

    const [inputAb, setInputAb] = useState<number>(1);
    const [scaledAb, setScaledAb] = useState<number>(1);

    const [inputDr, setInputDr] = useState<number>(1);
    const [scaledDr, setScaledDr] = useState<number>(1);

    const [inputDc, setInputDc] = useState<number>(1);
    const [scaledDc, setScaledDc] = useState<number>(1);

    const handleInputChange = (event:number, attribute:string) => {
        switch (attribute) {
            case "PB":
                setInputPb(event);
                break;
            case "AC":
                setInputAc(event);
                break;
            case "HP":
                setInputHp(event);
                break;
            case "AB":
                setInputAb(event);
                break;
            case "DR":
                setInputDr(event);
                break;
            case "DC":
                setInputDc(event);
                break;
        }
    };
    //#endregion

    //#region scaling functions
    const getChartPbValue = (mapping:CrChartMapping) => mapping.proficiencyBonus;
    const getChartAcValue = (mapping:CrChartMapping) => mapping.armorClass;
    const getChartHpValue = (mapping:CrChartMapping) => mapping.hitPoints;
    const getChartAbValue = (mapping:CrChartMapping) => mapping.attackBonus;
    const getChartDrValue = (mapping:CrChartMapping) => mapping.damagePerRound;
    const getChartDcValue = (mapping:CrChartMapping) => mapping.saveDifficultyCheck;

    useEffect(() => {setScaledPb(ScaleAttribute({attributeValue: inputPb, challengeRatingInput: leftCr, challengeRatingToScaleTo: rightCr, getValueFunction: getChartPbValue})); }, [inputPb, leftCr, rightCr]);
    useEffect(() => {setScaledAc(ScaleAttribute({attributeValue: inputAc, challengeRatingInput: leftCr, challengeRatingToScaleTo: rightCr, getValueFunction: getChartAcValue})); }, [inputAc, leftCr, rightCr]);
    useEffect(() => {setScaledHp(ScaleAttribute({attributeValue: inputHp, challengeRatingInput: leftCr, challengeRatingToScaleTo: rightCr, getValueFunction: getChartHpValue})); }, [inputHp, leftCr, rightCr]);
    useEffect(() => {setScaledAb(ScaleAttribute({attributeValue: inputAb, challengeRatingInput: leftCr, challengeRatingToScaleTo: rightCr, getValueFunction: getChartAbValue})); }, [inputAb, leftCr, rightCr]);
    useEffect(() => {setScaledDr(ScaleAttribute({attributeValue: inputDr, challengeRatingInput: leftCr, challengeRatingToScaleTo: rightCr, getValueFunction: getChartDrValue})); }, [inputDr, leftCr, rightCr]);
    useEffect(() => {setScaledDc(ScaleAttribute({attributeValue: inputDc, challengeRatingInput: leftCr, challengeRatingToScaleTo: rightCr, getValueFunction: getChartDcValue})); }, [inputDc, leftCr, rightCr]);
    //#endregion

    return (
    <div>
      <p>Monster Calculator</p>
        <div style={{marginBottom:10}}>CR <select
                value={leftCr}
                onChange={handleLeftCrChange}>
                {availableCrs.map((n) => (<option>{n}</option>))}
            </select>
            <select
                value={rightCr}
                onChange={handleRightCrChange}>
                {availableCrs.map((n) => (<option>{n}</option>))}
            </select>
        </div>
        <div style={{marginBottom:10}}>PB <InputScaledOutput input={inputPb} scaledInput={scaledPb} onChange={(e) => handleInputChange(e,"PB")}/></div>
        <div style={{marginBottom:10}}>AC <InputScaledOutput input={inputAc} scaledInput={scaledAc} onChange={(e) => handleInputChange(e,"AC")}/></div>
        <div style={{marginBottom:10}}>HP <InputScaledOutput input={inputHp} scaledInput={scaledHp} onChange={(e) => handleInputChange(e,"HP")}/></div>
        <div style={{marginBottom:10}}>AB <InputScaledOutput input={inputAb} scaledInput={scaledAb} onChange={(e) => handleInputChange(e,"AB")}/></div>
        <div style={{marginBottom:10}}>DR <InputScaledOutput input={inputDr} scaledInput={scaledDr} onChange={(e) => handleInputChange(e,"DR")}/></div>
        <div style={{marginBottom:10}}>DC <InputScaledOutput input={inputDc} scaledInput={scaledDc} onChange={(e) => handleInputChange(e,"DC")}/></div>
      <input value="Guess the CR" type="button"/>
    </div>
  );
};

export default App;
