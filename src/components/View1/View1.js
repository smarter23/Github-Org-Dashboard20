import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { Card,Row,Col } from 'antd';

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

    //   handleClick(event) {
    //     event.preventDefault();
    //     const { name } = this.barChart.state;
    //     console.log(name)
    // }
    compare (a,b) {
      const sa = a.score;
      const sb = b.score;
      let comparison = 0;
      if (sa > sb) {
        comparison = 1;
      } else if (sa < sb) {
        comparison = -1;
      }
      return comparison;
    }

    render(){
      const {leaderboard} = this.state;



      leaderboard.sort(this.compare)
        return (
          <Row>
            <Col span={3}></Col>
            <Col span={18}>
              <Card style={{margin :20}}>
              <h1 style={{textAlign:"center"}}>Leaderboard</h1>
              <BarChart
                width={900}
                height={500}
                data={leaderboard}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
                // ref={(ref) => (this.barChart = ref)}
                // onClick = {this.handleClick(e)}
                
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis  scale="pow"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
                {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
              </BarChart>
              </Card>
            </Col>
            <Col span={3}></Col>
            </Row>
          );
    }
}

export default Test;