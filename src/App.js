import React, { Component } from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';


import './App.css';
import Button from './components/button/Buttons';
import LeaderboardChart from './components/chart/Leaderboard-Chart';

class App extends Component {

  render() {

    return (
      // <BrowserRouter>


      // </BrowserRouter>
      <div className="App">
        <Button />
        <LeaderboardChart />
      </div>
    );
  }
}

export default App;
