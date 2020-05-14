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
      onClick = () => {
          console.log('clicked')
      }
    render(){
        return (
          <Row>
            <Col span={18}>
              <Card style={{margin :20}}>
              <BarChart
                width={900}
                height={500}
                data={this.state.leaderboard}
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
              </Card>
            </Col>
            </Row>
          );
    }
}

export default Test;