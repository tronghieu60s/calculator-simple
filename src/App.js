import React, { Component } from 'react';
import './App.css';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calculation: '',
      result: 0,
      statusEqual: false,
      statusDarkMode: false
    }
  }

  calculation = (event, key = 0) => {
    let { calculation, result } = this.state;
    let value;
    if(key === 0){
      value = event.target.innerText;
    }else{
      value = event.key;
    }
    let lastPositonCal = calculation[calculation.length - 1];
    if (result !== 0) {
      if (typeof lastPositonCal !== "undefined") {
        if (lastPositonCal.match(/[+\-*/%.]/)) {
          if (!value.match(/[+\-*/%.]/)) {
            calculation += value;
            result = eval(calculation);
          }
        } else {
          if (!value.match(/[+\-*/%.]/)) {
            calculation += value;
            result = eval(calculation);
          } else {
            calculation += value;
          }
        }
      } else {
        calculation += value;
        result = value;
      }
    } else {
      if (!value.match(/[*/%]/)) {
        calculation += value;
        result = value;
      }
    }
    this.setState({
      calculation,
      result,
      statusEqual: false
    })
  }

  deleteOne = () => {
    let { calculation, result } = this.state;
    let deleteCal = calculation.slice(0, -1);
    let lastPositionCal = deleteCal[deleteCal.length - 1];
    if (typeof lastPositionCal !== "undefined") {
      if (!lastPositionCal.match(/[+\-*/%.]/)) {
        result = eval(deleteCal);
      }
    } else {
      result = 0;
    }
    calculation = deleteCal;
    this.setState({
      calculation,
      result
    })
  }

  deleteAll = () => {
    this.setState({
      calculation: '',
      result: 0
    })
  }

  calculator = () => {
    let { statusEqual } = this.state;
    if (statusEqual) {
      this.setState({
        result: 0,
        calculation: '',
        statusEqual: false
      })
    } else {
      this.setState({
        statusEqual: true
      })
    }
  }

  darkMode = () => {
    let {statusDarkMode} = this.state;
    this.darkModeButton(!statusDarkMode);
    this.setState({
      statusDarkMode: !statusDarkMode
    })
    localStorage.setItem("DARKMODE-STATUS",JSON.stringify(!statusDarkMode));
  }

  componentDidMount = () => {
    let statusDarkMode = JSON.parse(localStorage.getItem("DARKMODE-STATUS"));
    let fun = this;
    window.addEventListener("keydown", function(event){
      if(event.key.match(/[0-9+\-*/%.]/)){
        fun.calculation(event, 1);
      }else if(event.key === "Backspace"){
        fun.deleteOne();
      }else if(event.key === "Delete"){
        fun.deleteAll();
      }else if(event.key === "=" || event.keyCode === 32){
        fun.calculator();
      }
    })
    this.darkModeButton(statusDarkMode);
    this.setState({
      statusDarkMode
    })
  }

  darkModeButton = (statusDarkMode) => {
    if(statusDarkMode){
      let button = document.querySelectorAll(".button:not(.sign):not(.equal)");
      for (let i = 0; i < button.length; i++) {
        button[i].classList.add("dark");
      }
    }else{
      let button = document.querySelectorAll(".button:not(.sign):not(.equal)");
      for (let i = 0; i < button.length; i++) {
        button[i].classList.remove("dark");
      }
    }
  }

  render() {
    let { calculation, result, statusEqual, statusDarkMode } = this.state;
    return (
      <div id="wrap" className={statusDarkMode ? 'dark' : ''}>
        <div className={`calculator ${statusDarkMode ? 'dark' : ''}`}>
          <div className="block-top">
            <div onClick={this.darkMode} id="bg-mode"><img src={statusDarkMode ? 'icons/sunny.svg' : 'icons/moon.svg'} alt="" /></div>
            <div className={`calculation ${statusDarkMode ? 'dark' : ''}`}>{calculation}</div>
            <div className={`result ${statusEqual ? 'equal' : ''} ${statusDarkMode ? 'dark' : ''}`}>{result.toLocaleString()}</div>
          </div>
          <div className="block-button">
            <div className="row">
              <div onClick={this.deleteOne} className="button delete">C</div>
              <div onClick={this.deleteAll} className="button delete-all">AC</div>
              <div onClick={this.calculation} className="button sign">%</div>
              <div onClick={this.calculation} className="button sign">/</div>
            </div>
            <div className="row">
              <div onClick={this.calculation} className="button">7</div>
              <div onClick={this.calculation} className="button">8</div>
              <div onClick={this.calculation} className="button">9</div>
              <div onClick={this.calculation} className="button sign">*</div>
            </div>
            <div className="row">
              <div onClick={this.calculation} className="button">4</div>
              <div onClick={this.calculation} className="button">5</div>
              <div onClick={this.calculation} className="button">6</div>
              <div onClick={this.calculation} className="button sign">-</div>
            </div>
            <div className="row">
              <div onClick={this.calculation} className="button">1</div>
              <div onClick={this.calculation} className="button">2</div>
              <div onClick={this.calculation} className="button">3</div>
              <div onClick={this.calculation} className="button sign">+</div>
            </div>
            <div className="row">
              <div onClick={this.calculation} className="button col2">0</div>
              <div onClick={this.calculation} className="button">.</div>
              <div onClick={this.calculator} className="button equal">=</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
