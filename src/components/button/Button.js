import React , {Component} from 'react';

import './Button.css';
import '../chart/leaderboard-chart';

class Button extends Component {

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
                <div>
                <button className="authenticate" onClick = {() => 
                fetch("https://dscinfo.herokuapp.com/oauth",{
                    mode:'no-cors',
                    headers: {
                        "Access-Control-Allow-Origin": "*"
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
                </button>

                <button className="load" onClick = {() =>
                    fetch("http://dscinfo.herokuapp.com/leaderboard?org=GDGVIT",{
                    method:"get",
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
                    
                </button>
            </div>
          )
      }

}

export default Button;