import React from 'react';
import RenderSelected from './RenderSelected.js';
import RenderUnselected from './RenderUnselected.js';

export default function ChooseRenderer(props) {

    var option = null;

    if (props.assign === 'unassigned')
        option = (
            <RenderUnselected
                name={props.name}
                price={props.price}
                assign={props.assign}
                total={props.totalBill}
                delivery={props.deliveryFee}
                index={props.index}

                handleNameAssign={props.handleNameAssign}
            />
        );
    else
        option = (
            <RenderSelected
                name={props.name}
                price={props.price}
                assign={props.assign}
                total={props.totalBill}
                delivery={props.deliveryFee}
                index={props.index}

                handleNameAssign={props.handleNameAssign}
            />
        );

    return option
};
