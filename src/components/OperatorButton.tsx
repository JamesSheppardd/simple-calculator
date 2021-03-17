import React from "react";
import mexp from "math-expression-evaluator";

interface ButtonType {
    type: string;
    placeValue: Function;
}

const OperatorButton = (props:ButtonType) => {

    const finalAnswer = () => {
        const topBar: any = document.getElementById("values");
        console.log(topBar.innerHTML);
        const val: string = topBar.innerHTML.split("").filter((char: string) => char !== "|").join("");
        topBar.innerHTML = mexp.eval(val);  // eval BIG NO without any checking to see if is just numbers inputted - can run any js/ts code
        
    }

    const writeValueInBar = () => {
        if(props.type !== "="){
            props.placeValue(props.type);
        }
        else{
            finalAnswer(); 
        }
    }
    return (
        <div className="button-div number-button">
            <button className="button" onClick={writeValueInBar}>{props.type}</button>
        </div>
    )
}

export default OperatorButton;