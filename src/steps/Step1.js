import React from 'react';
import './StepCSS.css';
import Image from '../components/Image.js';

const IMAGES = [
    "custom.png",
    "ubereats.png",
    "skipthedishes.png",
    "doordash.png",
    "foodora.png"
];

{/*Step1 - Service Selection*/}
function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return(
        <div className="container">
            {IMAGES.map(image => (
                <Image source={image} clickAction={props.clickAction} handleChange={props.handleChange}/>
            ))}
        </div>
    );
}

export default Step1
