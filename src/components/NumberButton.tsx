import React, { BaseSyntheticEvent } from "react";

interface Numbers {
    number: number;
}

const NumberButton = (props:Numbers) => {
    const topBar: any = document.getElementById("calculation-bar-input") 
    const writeValueInBar = () => {
        topBar ? topBar.value += props.number : null;
    }

    return (
        <div className="button-div number-button">
            <button className="button" onClick={writeValueInBar}>{props.number}</button>
        </div>
    )
}

export default NumberButton;