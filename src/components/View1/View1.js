import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush, ReferenceLine
} from 'recharts';

import { Card,Row,Col } from 'antd';

class Test extends PureComponent{

    constructor(props){
        super(props);
        this.state = {
          access_token: localStorage.getItem('access_token'),
          leaderboard: [],
          activeIndex : 0
    
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

    handleClick = (data, index) => {
      this.setState({
        activeIndex: index,
      });
      window.open("https://github.com/"+ data.name, "_blank")
    }

    render(){
      const {leaderboard,activeIndex} = this.state;



      leaderboard.sort(this.compare)
        return (
          <Row>
            <Col span={3}></Col>
            <Col span={18}>
              <Card style={{margin :20}}>
              <h1 style={{textAlign:"center"}}>Leaderboard</h1>
              <ResponsiveContainer width="99%" height={500}>
              <BarChart
                width={900}
                height={500}
                data={leaderboard}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis  scale="pow"/>
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }}/>
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="name" height={30} stroke="#8884d8" />
                <Bar dataKey="score" fill="#8884d8" onClick={this.handleClick} />
                {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
              </BarChart>
              </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={3}></Col>
            </Row>
          );
    }
}

export default Test;