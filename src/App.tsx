import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tmp from './Tmp';
import TeamFlag from "./components/TeamFlag/TeamFlag";

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <br/>
            <TeamFlag abbreviation={"SVN"}
                      flagSrc={"https://flagcdn.com/w40/si.png"}
                      name={"Slovenia"}
                      orientation={"left"}/>
            <br/>
            <br/>
            <Tmp/>
        </header>
    </div>
  );
}

export default App;
