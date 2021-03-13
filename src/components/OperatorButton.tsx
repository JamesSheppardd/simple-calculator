import React from "react";

interface ButtonType {
    type: string;
}

const OperatorButton = (props:ButtonType) => {

    const finalAnswer = () => {
        const topBar: any = document.getElementById("values");
        console.log(topBar.innerHTML);
        topBar.innerHTML = eval(topBar.innerHTML);  // eval BIG NO without any checking to see if is just numbers inputted - can run any js/ts code
        
    }

    const writeValueInBar = () => {
        const topBar: any = document.getElementById("values");
        if(props.type !== "="){
            topBar ? topBar.innerHTML += props.type : null;
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