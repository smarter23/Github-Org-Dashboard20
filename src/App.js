import React, { Component } from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';


import './App.css';
import { Button } from 'antd';
import 'antd/dist/antd.css';
// import Button from './components/button/Buttons';
import Dashboard from './Dashboard'

const CLIENT_ID =  "Iv1.5552b1340c6af2eb";
const REDIRECT_URI = "http://localhost:3000/dashboard";
export default class App extends Component {

  state = {
    status: null,
    token: null
  }
  
  componentDidMount() {
    const code =
      window.location.href.match('/?code=(.*)/') &&
      window.location.href.match('/?code=(.*)/')[1];
    console.log(code);

    // if (code) {
    //   this.setState({ status: "loading" });
    //   fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
    //     .then(response => response.json())
    //     .then(({ token }) => {
    //       this.setState({
    //         token,
    //         // status: STATUS.FINISHED_LOADING
    //       });
    //     });
    // }

  }

  render() {

    return (
      <BrowserRouter>
      <div className="App">
          <Switch>
            <Route path='/dashboard' component={Dashboard} />

            <Route path='/' render={() => (
                    <div>
                <Button type ="primary" className="authenticate">
                    <a style={{display: this.state.status === null ? "inline" : "none"}}
                    href = {`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>
                       Authenticate 
                    </a>
                </Button>
                  </div>
            )} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

// export default App;
