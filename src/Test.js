import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import ReactDOM from 'react-dom';
import { VictoryBoxPlot , VictoryChart, VictoryPolarAxis,
    VictoryTheme ,VictoryLegend, VictoryScatter,VictoryContainer, VictoryStack, VictoryBar, VictoryGroup,VictoryArea} from 'victory';
import { Card,Row,Col } from 'antd';

const data = [
    {name: "Ubaid Usmani", score: 219295},
    {name: "prakhar0912", score: 4740},
    {name: "Preeti Soni", score: 17},
    {name: "ramaneswaran", score: 585},
    {name: "ATechnoHazard", score: 5142},
    {name: "ashutosh.k", score: 2989},
    {name: "L04DB4L4NC3R", score: 640},
    {name: "Angad Sharma", score: 82951},
    {name: "mdhishaamakhtar", score: 766},
    {name: "Mayank Kumar", score: 1744},
    {name: "Nirmitjatana", score: 1802},
    {name: "sAVItar02", score: 776},
    {name: "Ashutosh Kaushik", score: 73},
    {name: "AshDarkfold", score: 46},
    {name: "SaurusXI", score: 274116},
    {name: "Geek-ubaid", score: 30},
    {name: "Shantanu Verma", score: 24},
    {name: "Spherical Flying Kat", score: 31},
    {name: "dependabot[bot]", score: 31}
  ];

class Test extends PureComponent{

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
      onClick = () => {
          console.log('clicked')
      }
    render(){
        return (
            <BarChart
              width={900}
              height={500}
              data={data}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
              onClick={this.onClick}
              
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis  />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
              {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
            </BarChart>
          );
    }
}

export default Test;