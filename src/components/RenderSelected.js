import React from 'react';
import './Selected.css';

{/*Step3 - Person to split to selection*/}
export default function RenderSelected(props) {
    return(
        <div className="item selected">
            <h3>{props.name}</h3>
            <p>${props.price}</p>
            <p>Who: {props.assign}</p>
        </div>
    );
}
