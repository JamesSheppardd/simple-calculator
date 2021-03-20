import React, { BaseSyntheticEvent } from "react";

interface Numbers {
    number: number;
    placeValue: Function;
    id: string;
}

const NumberButton = (props:Numbers) => {
    
    const writeValueInBar = (event: any) => {
        event.target.blur();
        props.placeValue(props.number.toString());
    }

    return (
        <div className="button-div number-button">
            <button className={`button button-${props.id} num-button`} onClick={writeValueInBar}>{props.number}</button>
        </div>
    )
}

export default NumberButton;