import React from 'react';
import './App.css';
import { Background, BackgroundInfo, Clock, 
  GoogleSearch, MainFocus, Quote,
  TodoList, Weather, Links
} from "./components";

function App() {
  return (
    <div className="App">
      <Background />
      <div id="top">
        <div id="top-left">
          <Links />
          <GoogleSearch />
        </div>
        <Weather />
      </div>
      <div id="center">
        <Clock />
        <MainFocus />
      </div>
      <div id="bottom">
        <BackgroundInfo />
        <Quote />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
