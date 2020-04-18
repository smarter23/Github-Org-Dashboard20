import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar , VictoryChart, VictoryPolarAxis,
    VictoryTheme } from 'victory';

import './View1.css';



class View1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      'access_token' : localStorage.getItem('access_token')
    }
  }
  
  componentDidMount(){
    console.log('hi')
    console.log(this.props);
    console.log(this.state);
    if(localStorage.getItem('access_token')){
      fetch('http://dscinfo.herokuapp.com/leaderboard?org=GDGVIT',{
        method:"GET",
        headers: new Headers({
          'Authorization' :  this.props.token
        })
      })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
    }
  }

    render(){
        return(

          <div>
            <h1 style={{textAlign:"center"}} > Organisation Leaderboard</h1>
            <VictoryChart polar
            theme={VictoryTheme.material}
            // domainPadding={20}
            height={150}
          >
            <VictoryPolarAxis dependentAxis
                labelPlacement="perpendicular"
                style={{ axis: { stroke: "none" } }}
                tickFormat={() => null}
            />
            <VictoryPolarAxis/>
            <VictoryBar
              height={150}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}              
              style={{ data: { fill: "#c8a2c8",stroke: "black", strokeWidth: 0 } }}
              data={[
                {user: "L04DB4L4NC3R", contrib: 82},
                {user: "Angad Sharma", contrib: 16816},
                {user: "bhaveshgoyal27", contrib: 19},
                {user: "dependabot-preview[bot]" , contrib: 3743},
                {user: "shashu421" , contrib : 2150},
                {user: "HRITISHA", contrib: 1105},
                {user: "alan478", contrib: 8805},
                {user: "Krishn157", contrib: 930}
            ]}
              x="user"
              y="contrib"
            />
          </VictoryChart>
          </div>
        )
    }
}

export default View1;
