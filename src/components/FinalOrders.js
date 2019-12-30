import React from 'react';
import '../steps/StepCSS.css';

export default function FinalOrders(props)   {
    return(
        <div className="item">
            <h1>{props.name}</h1>
            <p>${props.total}</p>
        </div>
    );
}
