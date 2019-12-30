import React from 'react';
import './button.css';

export default function FinishButton(props)  {
    if (!props.full) {
        return null
    }
    return(
        <button className="submitButton name-submit" onClick={() => props.finalStep()}>{props.message}</button>
    )
}
