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
                <div onClick={() => props.clickAction(image)} key={image}>
                    <Image source={image} />
                </div>
            ))}
        </div>
    );
}

export default Step1
