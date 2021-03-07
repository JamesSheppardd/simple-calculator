import React from "react";

interface ButtonType {
    type: string;
}

const MiscButton = (props:ButtonType) => {
    const topBar: any = document.getElementById("calculation-bar-input") 

    const determineAction = () => {
        switch(props.type){
            case ".": 
                writeValueInBar();
                break;
            case "clear": 
                topBar.value = null;
                break;
        }
    }

    const writeValueInBar = () => {
        topBar ? topBar.value += props.type : null;
    }

    return (
        <div className="button-div number-button">
            <button className="button" onClick={determineAction}>{props.type}</button>
        </div>
    )
}

export default MiscButton;