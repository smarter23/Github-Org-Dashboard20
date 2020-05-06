import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar , VictoryChart, VictoryPolarAxis,
    VictoryTheme } from 'victory';
import { Card } from 'antd';
import './View1.css';
import ScrollNumber from 'antd/lib/badge/ScrollNumber';



class View1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      access_token: localStorage.getItem('access_token'),
      leaderboard: []

    }
  }
  
  componentDidMount(){
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
      .then(resp => {
        console.log(resp)
        this.setState({
          leaderboard : resp.payload
        })
        console.log(this.state.leaderboard)
      })
      .catch(err => console.log(err))
    }

  }

    render(){
        return(
          <Card style={{width:500, margin :20}}>
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
              style={{ data: { fill: "#087e8b",stroke: "black", strokeWidth: 0 } }}
              data={
                this.state.leaderboard.forEach(data => {
                  return {x:data.name , y:data.score}
                })
            }
            />
          </VictoryChart>
          </div>
          </Card>
        )
    }
}

export default View1;
