import React, { Component } from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';


import './App.css';
import Button from './components/button/Buttons';
import Dashboard from './Dashboard'
import LeaderboardChart from './components/chart/Leaderboard-Chart';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
      <div className="App">
          <Switch>
            <Route path='/dashboard' component={Dashboard} />

            <Route path='/' render={() => (
                    <div>
                    <Button />
                    <LeaderboardChart />
                  </div>
            )} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
