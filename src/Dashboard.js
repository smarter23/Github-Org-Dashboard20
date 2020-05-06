import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout,Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Tabs } from 'antd';

import View1 from './components/View1/View1';
import View2 from './components/View2/View2';
import View3 from './components/View3/View3';
import Organisations from './components/Organisations';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key)
  if( key == 1){
    // fetch('http://dscinfo.herokuapp.com/leaderboard?org=GDGVIT',{
    //   method:"GET",
    //   headers: new Headers({
    //     'Authorization' :  localStorage.getItem('access_token')
    //   })
    // })
    // .then(res => {
    //   console.log(res)
    //   return res.json()
    // })
    // .then(resp => console.log(resp))
    // .catch(err => console.log(err))
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token:null,
      orgs: ''
    }
}
  componentDidMount(){
    console.log(this.props.location.search);
    const params = new URLSearchParams(this.props.location.search);
    params.get('code');
    let code = params.get('code');
    console.log(code)
    window.localStorage.setItem("code",code)

    if(!localStorage.getItem('access_token')){
    fetch('https://dscinfo.herokuapp.com/exchange',{
      method:'GET',
      headers: new Headers({
        'Authorization' : localStorage.getItem('code')
      })
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(resp => {
        console.log(resp)
        window.localStorage.setItem("access_token", resp.access_token);
      })
      .catch(err => console.log(err))
    }


  fetch('http://dscinfo.herokuapp.com/orgs',{
    method:"GET",
    headers: new Headers({
      'Authorization' :  localStorage.getItem('access_token')
    })
  })
  .then(res => {
    console.log(res)
    return res.json()
  })
  .then(resp => {
    console.log(resp)
    this.setState({
      orgs: resp.payload.data.viewer.organizations.nodes
    })
    console.log(this.state)
  })
  .catch(err => console.log(err))
  }
    render(){
      const token = localStorage.getItem('access_token');
      const {orgs} = this.state
      console.log(orgs)
      const menu = orgs.length ? (
        orgs.map(
          li => {
            return(
              <Menu.Item key="1">
                  {li.name}
              </Menu.Item>
            )
          }
        )
      ) : (
        <div></div>
      )
        return (
          <div>
            <Layout>
            <Header style = {{ position: "sticky", top: "0", height:64, backgroundColor:"#3c3c3c",zIndex:1 }}>           
              <Menu mode="horizontal" style = {{backgroundColor:"#3c3c3c", height:64}}>
                <Menu.Item style={{display: 'none'}} />
                {menu}
              </Menu>
            </Header>
            <Layout>
              <Content style={{ padding: '50px' }}>
                  <View1 token = {token}/>
                  <View2 token = {token}/>
                  <View3 token = {token}/>
              </Content>
            </Layout>

          </Layout>

          </div>
        )
    }
}

export default Dashboard;