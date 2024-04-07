import React from 'react';
import logoBall from './assets/football-ball.svg';
import logoShadow from './assets/football-shadow.svg'
import './App.css';
import LiveScore from "./components/LiveScore/LiveScore";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="logo-container">
                    <img src={logoShadow} className="App-logo" alt="logo"/>
                    <img src={logoBall} className="App-logo rotating" alt="logo"/>
                </div>
                <br/>
                <LiveScore/>
            </header>
        </div>
    );
}

export default App;
