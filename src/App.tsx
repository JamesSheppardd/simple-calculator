import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import CalculationBar from './components/CalculationBar';
import NumberButton from "./components/NumberButton";
import MiscButton from "./components/MiscButton";
import OperatorButton from "./components/OperatorButton";
import { evaluate } from "mathjs";

// Type in values when not selecting input box
const calculate = () => {
  const topBar: any = document.getElementById("values");
  if(topBar.innerHTML){
      topBar.innerHTML = evaluate(topBar.innerHTML);  // eval BIG NO without any checking to see if is just numbers inputted - can run any js/ts code
  }
}
const deleteChar = () => {
  const topBar: any = document.getElementById("values");
  topBar.innerHTML = topBar.innerHTML.split("").slice(0, -1).join("");
}
const clear = () => {
  const topBar: any = document.getElementById("values");
  topBar.innerHTML = "";
}
document.addEventListener("keydown", e => {
  // make the topBar a div in future, not input bar
  const topBar: any = document.getElementById("values");
  const key = e.key;
  if(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-", "+", "/", "*", "(", ")"].includes(key)) {
    topBar.innerHTML += key;
    console.log(key);
  }
  else if(["=", "Enter"].includes(key)){
    calculate();
  }
  else if (key === "Backspace"){
    deleteChar();
  }
  else if (key.toLowerCase() === "f"){
    clear();
  }
  
})

const Main = () => {
  const [values, setValues] = useState("1");

  const handleValues = () => {
    const valueSpan: any = document.getElementById("values");
    const value: string = valueSpan?.innerHTML;
    setValues(() => value)
    console.log(values);
  }

  if(values !== document.getElementById("values")?.innerHTML){
    handleValues();
  }

  return (
    <div>
      <CalculationBar {...handleValues} {...values}></CalculationBar>

      <div className="number-buttons">
        {/* Number buttons */}
        <NumberButton number={7}></NumberButton>
        <NumberButton number={8}></NumberButton>
        <NumberButton number={9}></NumberButton>
        <NumberButton number={4}></NumberButton>
        <NumberButton number={5}></NumberButton>
        <NumberButton number={6}></NumberButton>
        <NumberButton number={1}></NumberButton>
        <NumberButton number={2}></NumberButton>
        <NumberButton number={3}></NumberButton>
        <NumberButton number={0}></NumberButton>
        
        {/* Operator buttons */}
        <OperatorButton type="="></OperatorButton>
        <OperatorButton type="+"></OperatorButton>
        <OperatorButton type="-"></OperatorButton>
        <OperatorButton type="*"></OperatorButton>
        <OperatorButton type="/"></OperatorButton>

        {/* Miscellaneous buttons */}
        <MiscButton type="." func={() => null}></MiscButton>
        <MiscButton type="clear" func={clear}></MiscButton>
        <MiscButton type="(" func={() => null}></MiscButton>
        <MiscButton type=")" func={() => null}></MiscButton>
        <MiscButton type="delete" func={deleteChar}></MiscButton>
      </div>
      
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
