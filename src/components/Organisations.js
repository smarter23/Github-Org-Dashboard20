import React, { Component } from 'react';
import { Tabs } from 'antd';


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class Organisation extends Component{
    render(){
        return(
            <Tabs defaultActiveKey="1" tabPosition = "left" onChange={callback} style={{width:100}}>
                <TabPane tab="View 1" key="1">
                </TabPane>
                <TabPane tab="View 2" key="2">
                </TabPane>
                <TabPane tab="View 3" key="3">
                </TabPane>
            </Tabs>
        )
    }

}

export default Organisation;