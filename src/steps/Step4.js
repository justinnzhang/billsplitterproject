import React from 'react';
import FinalOrders from '../components/FinalOrders.js';
import './StepCSS.css';

const Step4 = (props) =>   {
    if (props.currentStep !== 4)  {
        return null
    }
    return  (
        <React.Fragment>
            {props.assignedOrders.map((item) => (
                <FinalOrders name={item.name} items={item.items} total={item.total} />
            ))}
        <button className="submitButton name-submit" onClick={() => props.resetApp()}>Another order</button>
        </React.Fragment>
    );
}

export default Step4
