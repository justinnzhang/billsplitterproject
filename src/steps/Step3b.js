import React from 'react';
import './StepCSS.css';
import ChooseRenderer from '../components/ChooseRenderer.js';
import FinishButton from '../components/FinishButton.js';

{/*Step3 - Person to split to selection*/}
const Step3b = (props) => {

    if (props.colStep === true || props.currentStep !== 3) {
        return null
    }
    else {
        return(
            <React.Fragment>
                {props.inputs.map((input) => (
                    <div onClick={() => props.handleNameAssign(input.index)}>
                        <ChooseRenderer
                            name={input.itemName}
                            price={input.itemPrice}
                            assign={input.assign}
                            total={props.totalBill}
                            delivery={props.deliveryFee}
                            index={input.index}
                        />
                    </div>
                ))}
                <button className="submitButton name-submit" onClick={() => props.handleContinue()}>Next Person</button>
                <FinishButton finalStep={props.finalStep} full={props.full} message={"Split it!"} />
            </React.Fragment>
        );
    }
}

export default Step3b
