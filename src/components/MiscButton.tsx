import React from "react";

interface ButtonType {
    type: string;
}

const MiscButton = (props:ButtonType) => {

    const determineAction = () => {
        const topBar: any = document.getElementById("calculation-bar-input");
        switch(props.type){
            case ".": 
                writeValueInBar(topBar);
                break;
            case "clear": 
                topBar.value = null;
                break;
        }
    }

    const writeValueInBar = (top: any) => {
        top ? top.value += props.type : null;
        top && console.log(props.type);
    }

    return (
        <div className="button-div number-button">
            <button className="button" onClick={determineAction}>{props.type}</button>
        </div>
    )
}

export default MiscButton;