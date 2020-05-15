import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import ReactDOM from 'react-dom';
import { VictoryBoxPlot , VictoryChart, VictoryPolarAxis,
    VictoryTheme ,VictoryLegend, VictoryScatter,VictoryContainer, VictoryStack, VictoryBar, VictoryGroup,VictoryArea} from 'victory';
import { Card,Row,Col } from 'antd';
import  {Menu, Dropdown}  from 'antd';
import { DownOutlined } from '@ant-design/icons';

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
      const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
      );
        return (
          <div>
          <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Click me <DownOutlined />
          </a>
        </Dropdown>
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
            </div>
          );
    }
}

export default Test;