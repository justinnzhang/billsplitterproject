import React from 'react';
import './Selected.css';

{/*Step3 - Person to split to selection*/}
export default function RenderUnselected(props) {
    return(
        <div className="item unselected">
            <h3>{props.name}</h3>
            <p>${props.price}</p>
            <p>Who: {props.assign}</p>
        </div>
    );
}
