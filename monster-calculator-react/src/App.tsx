import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {InputScaledOutput} from "./components/input-scaled-output";
import {CrChartMapping, GuessCr, ScaleAttribute, ScaleAttributeArgs} from "./services/monster-calculator-service";

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

    const handleGuessCrClick = () => {
        let guessedCr = GuessCr({
            proficiencyBonus: inputPb,
            armorClass: inputAc,
            hitPoints: inputHp,
            attackBonus: inputAb,
            damagePerRound: inputDr,
            saveDifficultyCheck: inputDc
        });

        setLeftCr(guessedCr);
    };

    return (
    <div style={{marginLeft:15}}>
      <h3>Monster Calculator</h3>
        <div style={{marginBottom:15}}>
            <div>CR | Select your CR on the left, and the target CR to scale to on the right.</div>
            <div>If you are unsure of your CR, enter your values and hit "Guess the CR".</div>
            <select
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
        <div style={{marginBottom:15}}><div>PB | Proficiency Bonus (easiest way to determine this is to take Attack Bonus - Strength Modifier)</div> <InputScaledOutput input={inputPb} scaledInput={scaledPb} onChange={(e) => handleInputChange(e,"PB")}/></div>
        <div style={{marginBottom:15}}><div>AC | Armor Class</div> <InputScaledOutput input={inputAc} scaledInput={scaledAc} onChange={(e) => handleInputChange(e,"AC")}/></div>
        <div style={{marginBottom:15}}><div>HP | Hit Points</div> <InputScaledOutput input={inputHp} scaledInput={scaledHp} onChange={(e) => handleInputChange(e,"HP")}/></div>
        <div style={{marginBottom:15}}><div>AB | Attack Bonus</div> <InputScaledOutput input={inputAb} scaledInput={scaledAb} onChange={(e) => handleInputChange(e,"AB")}/></div>
        <div style={{marginBottom:15}}><div>DR | Average Damage per Round</div> <InputScaledOutput input={inputDr} scaledInput={scaledDr} onChange={(e) => handleInputChange(e,"DR")}/></div>
        <div style={{marginBottom:15}}><div>DC | Save DC of any abilities or Spells they have</div> <InputScaledOutput input={inputDc} scaledInput={scaledDc} onChange={(e) => handleInputChange(e,"DC")}/></div>

        <div style={{marginTop:15}}>
            <div>Guess the CR based on the input attribute values</div>
            <button  onClick={handleGuessCrClick}>Guess the CR</button></div>
    </div>
  );
};

export default App;
