import React, { Component } from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';


import './App.css';
import { Button } from 'antd';
import 'antd/dist/antd.css';
// import Button from './components/button/Buttons';
import Dashboard from './Dashboard'
import Landing from './Landing'




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token:null
    }
}
  
  componentDidMount() {
  }

  render() {

    return (
      <BrowserRouter>
      <div className="App">
          <Switch>
            <Route path='/dashboard' component={Dashboard} />

            <Route path='/' component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}


