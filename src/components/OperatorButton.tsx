import React from "react";
import mexp from "math-expression-evaluator";

interface ButtonType {
    type: string;
    placeValue: Function;
}

const OperatorButton = (props:ButtonType) => {

    const finalAnswer = () => {
        const topBar: any = document.getElementById("values");
        try{
        const val: string = topBar.innerHTML.split("").filter((char: string) => char !== "|").join("");
        topBar.innerHTML = mexp.eval(val);  // eval BIG NO without any checking to see if is just numbers inputted - can run any js/ts code
        } catch(e){
            console.log(e);
        }
    }

    const writeValueInBar = (event:any) => {
        if(props.type !== "="){
            props.placeValue(props.type);
            event.target.blur();
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