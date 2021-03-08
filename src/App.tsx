import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import CalculationBar from './components/CalculationBar';
import NumberButton from "./components/NumberButton";
import MiscButton from "./components/MiscButton";
import OperatorButton from "./components/OperatorButton";
import { evaluate } from "mathjs";

// Type in values when not selecting input box
const calculate = () => {
  const topBar: any = document.getElementById("calculation-bar-input");
  if(topBar.value){
      topBar.value = evaluate(topBar.value);  // eval BIG NO without any checking to see if is just numbers inputted - can run any js/ts code
  }
  console.log(topBar.value);
}
document.addEventListener("keydown", e => {
  // make the topBar a div in future, not input bar
  const topBar: any = document.getElementById("calculation-bar-input");
  const key = e.key;
  if(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-", "+", "/", "*", "(", ")"].includes(key)) {
    topBar.value += key;
    console.log(key);
  }
  else if(["=", "Enter"].includes(key)){
    calculate();
  }
  else if (key === "Backspace"){
    topBar.value = topBar.value.split("").slice(0, -1).join("");
  }
  else if (key.toLowerCase() === "f"){
    topBar.value = "";
  }
  
})

const Main = () => {
  return (
    <div>
      <CalculationBar></CalculationBar>

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
        <MiscButton type="."></MiscButton>
        <MiscButton type="clear"></MiscButton>
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
