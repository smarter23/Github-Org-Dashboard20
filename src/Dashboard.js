import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Tabs } from 'antd';

import View1 from './components/View1/View1';
import View2 from './components/View2/View2';
import View3 from './components/View3/View3';
import Organisations from './components/Organisations';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token:null
    }
}
  componentDidMount(){
    console.log(this.props.location.search);
    const params = new URLSearchParams(this.props.location.search);
    params.get('code');
    let code = params.get('code');
    console.log(code)
    window.localStorage.setItem("code",code)

    fetch('http://dscinfo.herokuapp.com/exchange',{
      method:'GET',
      headers: new Headers({
        'Authorizaton' : localStorage.getItem('code')
      })
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  }
    render(){
        return (
          <div>
            <Layout style ={{ height: 720 }}>
            <Header style = {{ position: "sticky", top: "0", height:50, backgroundColor:"#010059" }}>           

            </Header>
            <Layout>
              <Sider style={{width: 100, backgroundColor:"#52437b"}}>
                  {/* <Organisations /> */}
              </Sider>
              <Content>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="View 1" key="1">
                  <View1 />
                </TabPane>
                <TabPane tab="View 2" key="2">
                  <View2 />
                </TabPane>
                <TabPane tab="View 3" key="3">
                  <View3 />
                </TabPane>
              </Tabs>
              </Content>
            </Layout>
            <Footer style={{ position: "sticky", bottom: "0", height:50 }} >Made with  &hearts; by DSC-VIT</Footer>
          </Layout>

          </div>
        )
    }
}

export default Dashboard;