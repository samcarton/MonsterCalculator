import React, {useState} from 'react';
import './App.css';

const availableCrs = [0, 1 / 8, 1 / 4, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

const App: React.FC = () => {
    const [leftCr, setLeftCr] = useState(0);
    const [rightCr, setRightCr] = useState(0);

    const handleLeftCrChange = (event:any) => {
        setLeftCr(event.target.value);
        console.log("left cr changed to ", event.target.value);
    };

    const handleRightCrChange = (event:any) => {
        setRightCr(event.target.value);
        console.log("right cr changed to ", event.target.value);
    };

    return (
    <div>
      <p>Monster Calculator</p>
        <div>CR
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
      <div>PB<input/><input readOnly/></div>
      <div>AC<input/><input readOnly/></div>
      <div>HP<input/><input readOnly/></div>
      <div>AB<input/><input readOnly/></div>
      <div>DR<input/><input readOnly/></div>
      <div>DC<input/><input readOnly/></div>
      <input value="Guess the CR" type="button"/>
    </div>
  );
};

export default App;
