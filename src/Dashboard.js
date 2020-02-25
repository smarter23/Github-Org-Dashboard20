import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Tabs } from 'antd';

import View1 from './components/View1/View1';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
class Dashboard extends Component {
    render(){
        return (
          <div>
            <Layout style ={{ height: 720 }}>
            <Header style = {{ position: "sticky", top: "0" }}>           

            </Header>
            <Layout>
              <Sider style={{width: 100}}>Sider</Sider>
              <Content>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="View1" key="1">
                  <View1 />
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
              </Content>
            </Layout>
            <Footer style={{ position: "sticky", bottom: "0" }} >Footer</Footer>
          </Layout>

          </div>
        )
    }
}

export default Dashboard;