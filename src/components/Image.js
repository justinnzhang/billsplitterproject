import React from "react";
import './Image.css';
import '../steps/StepCSS.css';

export default function Image(props)    {
    return(
        <React.Fragment>
        <div className="choice" title=<ServiceName value={props.source} /> onClick={props.clickAction} >
            <div className="imageHolder">
                <img src={"./images/" + props.source} alt={props.source} className="w-25 m-2" />
            </div>
            <h1><ServiceName value={props.source} /></h1>
        </div>
        </React.Fragment>
    );

}

function ServiceName(props)    {
    switch (props.value)    {
        case "ubereats.png":
            return "Uber Eats";
            break;
        case "skipthedishes.png":
            return "Skip The Dishes";
            break;
        case "foodora.png":
            return "Foodora";
            break;
        case "doordash.png":
            return "Doordash";
            break;
        default:
            return "Custom";
    }
};
