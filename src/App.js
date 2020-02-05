import React, { Component } from 'react';

import './App.css';
import Button from './components/button/Button';
// import LeaderboardChart from './components/chart/leaderboard-chart';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Button />
        {/* <LeaderboardChart /> */}
      </div>
    );
  }
}

export default App;
