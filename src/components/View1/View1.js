import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar , VictoryChart, VictoryPolarAxis,
    VictoryTheme } from 'victory';
import { Card,Row,Col } from 'antd';
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
          <Row>
            <Col span = {16}>
            <Card style={{margin :20}}>
          <div>
            <h1 style={{textAlign:"center"}} > Organisation Leaderboard</h1>
            <VictoryChart 
            theme={VictoryTheme.material}
            domainPadding={{x:15}}
            height={150}
            padding ={{top:20,bottom:40, left:40, right:60}}
            
          >
            {/* <VictoryPolarAxis dependentAxis
                labelPlacement="perpendicular"
                style={{ axis: { stroke: "none" } }}
                tickFormat={() => null}
            /> */}
            {/* <VictoryPolarAxis/> */}
            <VictoryBar
              height={150}
              scale={{x: "linear", y: "sqrt"}}
              barRatio={0.8}
              // labels={({ datum }) => datum.x}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}              
              style={{ data: { fill: ({ index }) => index%2 === 0  ? "#087e8b" : "#c1839f",stroke: "black", strokeWidth: 0 }, labels: { fill: "white" } }}
              data={
                this.state.leaderboard.map(data => {
                  return {x:data.name , y:data.score}
                })
            }

            />
          </VictoryChart>
          </div>
          </Card>

            </Col>
          </Row>
     )
    }
}

export default View1;
