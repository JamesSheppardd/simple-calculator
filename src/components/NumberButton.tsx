import React, { BaseSyntheticEvent } from "react";

interface Numbers {
    number: number;
}

const NumberButton = (props:Numbers) => {
    
    const writeValueInBar = () => {
        const topBar: any = document.getElementById("values");
        topBar ? topBar.innerHTML += props.number : null;
        console.log(props.number);
    }

    return (
        <div className="button-div number-button">
            <button className="button" onClick={writeValueInBar}>{props.number}</button>
        </div>
    )
}

export default NumberButton;