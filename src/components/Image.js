import React from "react";
import './Image.css';
import '../steps/StepCSS.css';

export default function Image(props)    {
    return(
        <React.Fragment>
        <div className="choice" title=<ServiceName value={props.source} /> >
            <div className="imageHolder">
                <img src={"./images/" + props.source} alt={props.source} className="" />
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
        case "skipthedishes.png":
            return "Skip The Dishes";
        case "foodora.png":
            return "Foodora";
        case "doordash.png":
            return "Doordash";
        default:
            return "Custom";
    }
};
