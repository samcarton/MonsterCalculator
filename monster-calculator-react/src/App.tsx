import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <p>Monster Calculator</p>
      <div>CR<input/><input/></div>
      <div>PB<input/><input/></div>
      <div>AC<input/><input/></div>
      <div>HP<input/><input/></div>
      <div>AB<input/><input/></div>
      <div>DR<input/><input/></div>
      <div>DC<input/><input/></div>
      <input value="Guess the CR" type="button"/>
    </div>
  );
}

export default App;
