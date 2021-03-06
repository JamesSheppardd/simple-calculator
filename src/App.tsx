import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import CalculationBar from './components/CalculationBar';
import NumberButton from "./components/NumberButton";
import MiscButton from "./components/MiscButton";
import OperatorButton from "./components/OperatorButton";
import mexp from "math-expression-evaluator";
import * as themes from "./common/themes";
import { remote, Menu } from "electron";
//import Store from "./store.js"
import fs from "fs";
import path from "path";




// start at position 0 of array
let calcPosition: number = 0;
let lastAnswer: number = 0;

// Type in values when not selecting input box
const calculate = () => {
  const topBar: any = document.getElementById("values");
  let val: any = topBar.innerHTML;
  if(val){
    try{
      val = val.split("").filter((char: string) => char !== "|").join(""); // filter out the | indicator
      topBar.innerHTML = `${mexp.eval(val)}`;  // eval BIG NO without any checking to see if is just numbers inputted - can run any js/ts code
      lastAnswer = topBar.innerHTML;
      calcPosition = topBar.innerHTML.length;
    }
    catch(e) {
      console.log(e)
    }
  }
}
const deleteChar = () => {
  const topBar: any = document.getElementById("values");
  let val: any = topBar.innerHTML;
  if(calcPosition > 0){
    val = val.split("");
    val.splice(calcPosition-1, 1);
    topBar.innerHTML = val.join("");
    calcPosition -= 1;
  }
}
const clear = () => {
  const topBar: any = document.getElementById("values");
  topBar.innerHTML = "";
}
const moveLeftInCalc = () => {
  const topBar: any = document.getElementById("values");
  topBar.innerHTML = topBar.innerHTML.split("").filter((char: string) => char !== "|" ).join("");
  let val: any = topBar.innerHTML;
  // if the position is 0 then don't move
  if(calcPosition > 0) {
    calcPosition -= 1;
    val = val.split("");
    val.splice(calcPosition, 0, "|");
    topBar.innerHTML = val.join("");
  }
}
const moveRightInCalc = () => {
  const topBar: any = document.getElementById("values");
  topBar.innerHTML = topBar.innerHTML.split("").filter((char: string) => char !== "|" ).join("");
  let val: any = topBar.innerHTML;
  // if the position is 0 then don't move
  if(calcPosition < val.length) {
    calcPosition += 1;
    val = val.split("");
    val.splice(calcPosition, 0, "|");
    topBar.innerHTML = val.join("");
  }
}
const placeNewValue = (key: string) => {
  const topBar: any = document.getElementById("values");
  let value: any = topBar.innerHTML;
  value += "";
  value = value.split("");
  key.split("").forEach((char:string, i:number) => {
    value.splice(calcPosition+i, 0, char);
    calcPosition += 1
  })
  topBar.innerHTML = value.join("");
}
const getLastAnswer = () => {
  const topBar: any = document.getElementById("values");
  topBar.innerHTML = lastAnswer;
}

// Adding keyboard shortcuts 
document.addEventListener("keydown", e => {
  const key = e.key;
  if(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-", "+", "/", "*", "(", ")", "."].includes(key)) {
    placeNewValue(key);
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
  else if (key.toLowerCase() === "arrowleft"){
    moveLeftInCalc();
  }
  else if (key.toLowerCase() === "arrowright"){
    moveRightInCalc();
  }
  else if (key.toLowerCase() === "s") {
    placeNewValue("^2");
  }
  else if (key.toLowerCase() === "i" || key.toLowerCase() === "^") {
    placeNewValue("^");
  }
  else if (key.toLowerCase() === "r") {
    placeNewValue("root(");
  }
  else if (key.toLowerCase() === "p") {
    placeNewValue("pi");
  }
  else if (key.toLowerCase() === "q") {
    placeNewValue("sin(");
  }
  else if (key.toLowerCase() === "w") {
    placeNewValue("cos(");
  }
  else if (key.toLowerCase() === "e") {
    placeNewValue("tan(");
  }
  else if (key.toLowerCase() === "!") {
    placeNewValue("!");
  }
  else if (key.toLowerCase() === "%") {
    placeNewValue("(0.01*");
  }
  else if(key.toLowerCase() === "arrowup"){
    getLastAnswer();
  }
  else if(key.toLowerCase() === "arrowdown"){
    const topBar: any = document.getElementById("values");
    topBar.innerHTML = "";
  }
  
})


const Main = () => {
  // Getting user-preferences -> stored in (disk):\Users\(username))\AppData\Roaming\Electron\user-preferences
  const getStore = (filePath: any) => {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (e) {
      return "default";
    }
  }

  // Setting the theme
  const setTheme = (theme: string) => {
    let thisTheme: any = themes.allThemes.normal;
    const setCssProperty = document.body.style;
    if (theme === "default"){
      thisTheme = themes.allThemes.normal;
    }
    else if(theme === "darkRed") {
      thisTheme = themes.allThemes.darkRed;
    }
    else if(theme === "darkPurple") {
      thisTheme = themes.allThemes.darkPurple;
    }
    else if(theme === "warm") {
      thisTheme = themes.allThemes.warm;
    }
    else if(theme === "pastel") {
      thisTheme = themes.allThemes.pastel;
    }
    else if(theme === "gameboy") {
      thisTheme = themes.allThemes.gameboy;
    }
    else if(theme === "light") {
      thisTheme = themes.allThemes.light;
    }
    
    setCssProperty.setProperty("--background", thisTheme.background);
    setCssProperty.setProperty("--button-colour", thisTheme.buttonBackground);
    setCssProperty.setProperty("--button-hover", thisTheme.buttonHover);
    setCssProperty.setProperty("--calc-bar-colour", thisTheme.calculationBarBackground);
    setCssProperty.setProperty("--button-text", thisTheme.buttonText);
    setCssProperty.setProperty("--calc-text", thisTheme.calcText);
    setCssProperty.setProperty("--menubar-colour", thisTheme.menubar);
  }

  // Setting the theme
  useEffect(() => {
    const theme: any = getStore(path.join(remote.app.getPath("userData"), "user-preferences" + ".json"));
    const newTheme:string = theme.appData.theme;
    setTheme(newTheme);
    setInterval(() => {
      const theme: any = getStore(path.join(remote.app.getPath("userData"), "user-preferences" + ".json"));
      const newTheme:string = theme.appData.theme;
      setTheme(newTheme);
    }, 1000)
    
  })

  return (
    <div>
      <CalculationBar></CalculationBar>

      <div className="all-buttons">
        <div className="number-buttons">
          {/* Number buttons */}
          <NumberButton id="7" number={7} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="8" number={8} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="9" number={9} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="4" number={4} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="5" number={5} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="6" number={6} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="1" number={1} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="2" number={2} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="3" number={3} placeValue={placeNewValue}></NumberButton>
          <NumberButton id="0" number={0} placeValue={placeNewValue}></NumberButton>
        </div>

        {/* Operator buttons */}
        <div className="operator-buttons">  
          <OperatorButton type="=" placeValue={placeNewValue}></OperatorButton>
          <OperatorButton type="+" placeValue={placeNewValue}></OperatorButton>
          <OperatorButton type="-" placeValue={placeNewValue}></OperatorButton>
          <OperatorButton type="*" placeValue={placeNewValue}></OperatorButton>
          <OperatorButton type="/" placeValue={placeNewValue}></OperatorButton>
        </div>

          {/* Miscellaneous buttons */}
        <div className="misc-buttons">
          <MiscButton id="decimal" type="." func={() => null} value="." placeValue={placeNewValue}></MiscButton>
          <MiscButton id="clear" type="clear" func={clear} value="" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="left-bracket" type="(" func={() => null} value="(" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="right-bracket" type=")" func={() => null} value=")" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="delete" type="delete" func={deleteChar} value="" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="sqaure" type="x??" func={() => null} value="^2" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="power" type="x???" func={() => null} value="^" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="root" type="?????x" func={() => null} value="root(" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="pi" type="??" func={() => null} value="pi" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="sin" type="sin" func={() => null} value="sin(" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="cos" type="cos" func={() => null} value="cos(" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="tan" type="tan" func={() => null} value="tan(" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="log" type="log" func={() => null} value="log(" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="factorial" type="!" func={() => null} value="!" placeValue={placeNewValue}></MiscButton>
          <MiscButton id="percent" type="%" func={() => null} value="(0.01*" placeValue={placeNewValue}></MiscButton>
        </div>
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
