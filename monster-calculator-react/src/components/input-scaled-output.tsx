import React, {ChangeEvent, useState} from 'react';

export interface OnChangeFunction {
    (event: number): void
}

export interface InputScaledOutputProps {
  input: number,
  scaledInput: number,
  onChange: OnChangeFunction
}

export const InputScaledOutput : React.FC<InputScaledOutputProps> = (props) => {
    const {input, scaledInput, onChange} = props;
    const handlePbChange = (event:ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(event.target.value));
    };

    return  <div style={{display:"inline"}}>
                <input type="number" value={input} onChange={handlePbChange}/><input readOnly value={scaledInput}/>
            </div>;
};

