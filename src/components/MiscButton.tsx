import React from "react";

interface ButtonType {
    id: string;
    type: string;
    func: Function;
    value: string;
    placeValue: Function;
}

const MiscButton = (props:ButtonType) => {

    const determineAction = () => {
        const topBar: any = document.getElementById("values");
        if(props.func() === null){
            props.placeValue(props.value);
        } else {
            props.func();
        }
    }

    const writeValueInBar = (top: any) => {
        top ? top.innerHTML += props.value : null;
        top && console.log(props.value);
    }

    return (
        <div className="button-div number-button" id={props.id} >
            <button className="button"onClick={determineAction}>{props.type}</button>
        </div>
    )
}

export default MiscButton;