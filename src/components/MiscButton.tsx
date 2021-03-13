import React from "react";

interface ButtonType {
    type: string;
    func: Function;
}

const MiscButton = (props:ButtonType) => {

    const determineAction = () => {
        const topBar: any = document.getElementById("values");
        if(props.func() === null){
            writeValueInBar(topBar);
        } else {
            props.func();
        }
    }

    const writeValueInBar = (top: any) => {
        top ? top.innerHTML += props.type : null;
        top && console.log(props.type);
    }

    return (
        <div className="button-div number-button">
            <button className="button" onClick={determineAction}>{props.type}</button>
        </div>
    )
}

export default MiscButton;