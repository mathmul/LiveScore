import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tmp from './Tmp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Tmp />
      </header>
    </div>
  );
}

export default App;
