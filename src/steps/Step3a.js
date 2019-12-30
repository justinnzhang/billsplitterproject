import React, { useState } from 'react';
import '../steps/StepCSS.css';


const Step3a = (props) => {
    const [ name, setName ] = useState('');

    const handleInputs = (event) => {
        setName(event.target.value);
    };

    const submitName = e =>    {
        e.preventDefault();
        props.handleCurrName(name);
    };

    if (props.colStep === false || props.currentStep !== 3)    {
        return null;
    }
    else {
        return(
            <div className="fields">
                <input
                    type="Text"
                    defaultValue=""
                    className="form name-input"
                    name="nameInput"
                    onChange={event => handleInputs(event)}
                />
                <button
                    onClick={submitName}
                    className="submitButton name-submit"
                >Submit</button>
            </div>
        );
    }
}

export default Step3a
