import React , {Component} from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';

import './Button.css';

class Buttons extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          data: []
        };
      }   

      render(){
          return (
                <div className="buttons">
                <Button type ="primary" className="authenticate" onClick = {() => 
                fetch("https://dscinfo.herokuapp.com/oauth",{
                    // mode:'no-cors',
                    headers: {
                        // "Access-Control-Allow-Origin": "*",
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    } 
                }
                )
                .then(res => res.json())
                .then(
                    (result) => {
                    this.setState({
                        isLoaded: true
                    });
                    },
                    (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    }
                ) }>
                    Authenticate
                </Button>

                <Button type ="primary" className="load" onClick = {() =>
                    fetch("http://dscinfo.herokuapp.com/leaderboard?org=GDGVIT",{
                    method:"get",
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                       },                
                    credentials:"include",
                    mode:"cors"
                    })
                    .then(res =>  console.log(res))
                    .then(
                        (result) => {
                            console.log('Got result');
                        this.setState({data: result.payload});
                        },
                        (error) => {
                            console.log(error);
                        }
                    ) }>Load leaderboard
                    
                </Button>
            </div>
          )
      }

}

export default Buttons;