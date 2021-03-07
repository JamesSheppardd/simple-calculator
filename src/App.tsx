import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import CalculationBar from './components/CalculationBar';
import NumberButton from "./components/NumberButton";
import MiscButton from "./components/MiscButton";
import OperatorButton from "./components/OperatorButton";

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
