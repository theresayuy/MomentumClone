import React from 'react';
import './App.css';
import GoogleSearch from './components/googlesearch';
import Background from './components/bg';
import Weather from './components/weather';
import Clock from './components/clock';
import MainFocus from './components/mainfocus';
import Quote from './components/quotes';
import {LinksButton} from './components/links';
import {TodoButton} from './components/todolist';

function App() {
  return (
    <div className="App" id="app">
      <Background />
      <div id="header">
        <div id="header-left">
          <LinksButton /><GoogleSearch />
        </div>
        <Weather />
      </div>
      <div id="center">
        <Clock />
        <MainFocus />
      </div>
      <div id="bottom">
        <Quote /><TodoButton />
      </div>
    </div>
  );
}

export default App;