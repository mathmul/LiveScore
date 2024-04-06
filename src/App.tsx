import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tmp from './Tmp';
import MatchRow, { MatchRowProps } from "./components/MatchRow/MatchRow";


function App() {
    const props: MatchRowProps = {
        home_team: {
            abbreviation: "SVN",
            flagSrc: "https://flagcdn.com/w40/si.png",
            name: "Slovenia",
        },
        away_team: {
            abbreviation: "ESP",
            flagSrc: "https://flagcdn.com/w40/es.png",
            name: "Spain",
        },
        homeScore: 1,
        awayScore: 0,
    }

  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <br/>
            <MatchRow { ...props } />
            <br/>
            <br/>
            <Tmp/>
        </header>
    </div>
  );
}

export default App;
