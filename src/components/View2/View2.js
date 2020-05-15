import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,ComposedChart,Bar, ResponsiveContainer
} from 'recharts';
import { Card,Row,Col  } from 'antd';
import  {Menu, Dropdown}  from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;
const data = [
  {"name": "Angad Sharma", 
  "gravatar": "https://www.gravatar.com/avatar/5e8def242c2dd4eede4822fe2f8944b4?default=identicon", 
  "commits":  1, 
  "insertions":  53, 
  "deletions": 0, 
  "percentage-of-changes":  1.42 
  }, 
  {"name":  "AshDarkfold", 
  "gravatar": "https://www.gravatar.com/avatar/ecb219a7bb5a426385082e35bb2fc1fa?default=identicon",
   "commits": 11, 
   "insertions": 497, 
   "deletions":  82, 
   "percentage-of-changes":15.56
  },
  {"name":  "Ashutosh Kaushik", 
  "gravatar": "https://www.gravatar.com/avatar/04d12d589b1665ed14be49a78de6c049?default=identicon",
   "commits": 23, 
   "insertions": 2206, 
   "deletions":  420, 
   "percentage-of-changes":70.56
  },
  {"name":  "ashutosh.k", 
  "gravatar": "https://www.gravatar.com/avatar/f7a1c99c7f218624410b4aac409c1c5f?default=identicon",
   "commits": 4, 
   "insertions": 415, 
   "deletions":  49, 
   "percentage-of-changes":12.47
  },
 ]
   
const data1 = 
[{"name": "2020W04", "authors": {"author": {"name": "Angad Sharma", "gravatar": {"$": "https://www.gravatar.com/avatar/5e8def242c2dd4eede4822fe2f8944b4?default=identicon"}, "work": {"$": "++++++++++++++++++++++++"}}}, "modified_rows":  53}, {"name": "2020W09", "authors": {"author": {"name":  "AshDarkfold", "gravatar": {"$": "https://www.gravatar.com/avatar/ecb219a7bb5a426385082e35bb2fc1fa?default=identicon"}, "work": {"$": "++++++++++++++++++++++++"}}}, "modified_rows":  328}, {"name": "2020W16", "authors": {"author": {"name":  "Ashutosh Kaushik", "gravatar": {"$": "https://www.gravatar.com/avatar/04d12d589b1665ed14be49a78de6c049?default=identicon"}, "work": {"$": "---+++++++++++++++++++++"}}}, "modified_rows": 1791}, {"name":  "2020W17", "authors": {"author": [{"name":  "AshDarkfold", "gravatar": {"$": "https://www.gravatar.com/avatar/ecb219a7bb5a426385082e35bb2fc1fa?default=identicon"}, "work": {"$": "-++++"}}, {"name": "Ashutosh Kaushik", "gravatar": {"$": "https://www.gravatar.com/avatar/04d12d589b1665ed14be49a78de6c049?default=identicon"}, "work": {"$": "-----++++++++++++++++++"}}]}, "modified_rows": 1064}]
export default class View2 extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
      access_token: localStorage.getItem('access_token'),
      repodata: [],
      repodetails: []

    }
  }

  componentDidMount(){
    console.log(this.props);
    if(localStorage.getItem('access_token')){
      fetch('http://dscinfo.herokuapp.com/repos?org=GDGVIT',{
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
          repodata : resp.payload
        })
        console.log(this.state.repodata)
        
      })
      .catch(err => console.log(err))
      
      fetch('http://dscinfo.herokuapp.com/json/analyze?org=GDGVIT&repo=project-ideas-v2-frontend',{
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
          repodetails : resp.gitinspector.changes.authors.author
        })
      })
      .catch(err => console.log(err))
    }
  }

  

    render(){

      const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
          return (
            <div className="custom-tooltip">
              <img src={payload[0].payload.gravatar} />
            </div>
          );
        }
      
        return null;
      };

      function onChange(value) {
        console.log(`selected ${value}`);
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }

      const {repodata} = this.state;
      const options = repodata.length ? (
        repodata.map(
          op => {
            console.log(op)
            return (
              <Menu.Item value={op.name} key={op.name}>{op.name}</Menu.Item>
            )
            
          }
        )
      ) :(
        <div> Loading </div>
      )

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
      const {repodetails} = this.state

    
        return(
          <Row>
            <Col span={3}></Col>
            <Col span={18}>
            <Card style={{ margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Repo-vise contributions </h1>

              {/* <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Click me <DownOutlined />
                </a>
              </Dropdown> */}
              
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a repository"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>

              <h1 style={{textAlign:"center"}}> project-ideas-v2-frontend </h1>
              <ResponsiveContainer width="99%" height={500}>
              <LineChart width={600} height={300} data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                <Line type="monotone" dataKey="commits" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="insertions" stroke="#82ca9d" />
                <Line type="monotone" dataKey="deletions" stroke="#00d2d2" />

              </LineChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="99%" height={500}>
              <ComposedChart
                width={500}
                height={400}
                data={data1}
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="modified_rows" barSize={20} fill="#82ca9d" />
                <Line type="monotone" dataKey="modified_rows" stroke="#8884d8" />
              </ComposedChart>
              </ResponsiveContainer>


            </div>
            </Card>

            </Col>
            <Col span={3}></Col>

          </Row>
      )
    }
}

// export default View2;
