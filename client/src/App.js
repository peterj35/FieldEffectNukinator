import React from 'react';
import reactLogo from './logo.svg';
import socketLogo from './socketIO.png'

import Countries from './components/Countries'
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1><span className="small"><a href="https://fieldeffect.com/" target="_blank">Field Effect Software</a></span> <br/> Nukinator&trade;</h1>
        Built with
        <div className="Logos-Container">
          <img src={reactLogo} className="App-logo" alt="logo" /> 
          <img src={socketLogo} className="App-logo" alt="logo" />
        </div>
      </header>
      <Countries />
    </div>
  );
}

export default App;
