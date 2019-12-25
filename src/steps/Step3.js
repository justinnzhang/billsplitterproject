import React from 'react';
import './StepCSS.css';

{/*Step1 - Person to split to selection*/}
function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return(
        <React.Fragment>
            <button className="btn btn-success btn-block">Sign up</button>
        </React.Fragment>
    );
}

export default Step3
