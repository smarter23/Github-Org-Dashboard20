import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip
} from 'recharts';

import { Card,Row,Col } from 'antd';


class User extends PureComponent{

    constructor(props){
        super(props);
        this.state = {
          access_token: localStorage.getItem('access_token'),
          leaderboard: []
    
        }
      }
    
      componentDidMount(){
        console.log(this.props);  
    
      }

      

    render(){

      const data = [
        {name:"Followers", value:this.props.user.followers},
        {name:"Following", value:this.props.user.following},
        {name:"Public repos", value:this.props.user.public_repos},
        {name:"Private repos", value:this.props.user.total_private_repos},
      ]  
      
        return (
          <Row>
            <Col span={3}></Col>
            <Col span={18}>
              <Card style={{margin :20}}>
              <h1 style={{textAlign:"center", fontSize:20}}> Hi, {this.props.user.name}</h1>
              {/* <p>Public repos : {this.props.user.public_repos}</p>
              <p>Private repos : {this.props.user.total_private_repos}</p>
              <p>Followers: {this.props.user.followers}</p>
              <p>Following: {this.props.user.following}</p> */}
              <p>You've been on Github since - {this.props.user.created_at}</p>
              <RadarChart cx={300} cy={250} outerRadius={150} width={540} height={500} data={data} margin={{ top: 5, right: 35, bottom: 5, left: 5 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar name={this.props.user.name} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>

              </Card>
            </Col>
            <Col span={3}></Col>

            </Row>
          );
    }
}

export default User;