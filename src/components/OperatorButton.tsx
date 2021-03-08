import React from "react";

interface ButtonType {
    type: string;
}

const OperatorButton = (props:ButtonType) => {

    const finalAnswer = () => {
        const topBar: any = document.getElementById("calculation-bar-input") 
        topBar.value = eval(topBar.value);  // eval BIG NO without any checking to see if is just numbers inputted - can run any js/ts code
        console.log(topBar.value)
    }

    const writeValueInBar = () => {
        const topBar: any = document.getElementById("calculation-bar-input");
        if(props.type !== "="){
            topBar ? topBar.value += ` ${props.type} ` : null;
            console.log(props.type);
        }
        switch(props.type){
            case "=": finalAnswer();
        }
    }
    return (
        <div className="button-div number-button">
            <button className="button" onClick={writeValueInBar}>{props.type}</button>
        </div>
    )
}

export default OperatorButton;