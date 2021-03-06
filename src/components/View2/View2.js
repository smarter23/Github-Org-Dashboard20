import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,ComposedChart,Bar, ResponsiveContainer,BarChart
} from 'recharts';
import { Card,Row,Col,Menu, Dropdown,Select  } from 'antd';
import { DownOutlined } from '@ant-design/icons';


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

const data2 = [{
  "name": "Angad Sharma",
  "gravatar": "https://www.gravatar.com/avatar/5e8def242c2dd4eede4822fe2f8944b4?default=identicon",
  "files": {
    "file": {
      "name": "README.md",
      "rows": 53,
    }
  }
}, {
  "name": "AshDarkfold",
  "gravatar": "https://www.gravatar.com/avatar/ecb219a7bb5a426385082e35bb2fc1fa?default=identicon",
  "files": {
    "file": [{
      "name": "src/serviceWorker.js",
      "rows": 106,
    }, {
      "name": "src/addIdea.js",
      "rows": 70,
    }, {
      "name": "README.old.md",
      "rows": 68,
    }]
  }
}]
export default class View2 extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
      access_token: localStorage.getItem('access_token'),
      repodata: [],
      repodetails: [],
      repotime:[]
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
          repodetails : resp.gitinspector.changes.authors.author,
          repotime: resp.gitinspector.timeline.periods.period

        })
      })
      .catch(err => console.log(err))
    }
  }

  

    render(){

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
      const {repodetails,repotime} = this.state

      let getC = (x)=>{return x.commits.$;}
      let getI = (x)=>{return x.insertions.$;}
      let getD = (x)=>{return x.deletions.$;}
      let getN = (x)=>{return x.name.$;}
      let getT = (x)=>{return x.modified_rows.$;}


        return(
          <Row>
            <Col span={3}></Col>
            <Col span={18}>
            <Card style={{ margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Repo-vise contributions </h1>

              {/* {menu} */}

              {/* <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Click me <DownOutlined />
                </a>
              </Dropdown> */}
              
              {/* <Select
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
              </Select> */}

              <h1 style={{textAlign:"center"}}> project-ideas-v2-frontend </h1>

              {/* Commits Insertions Deletions */}
              <ResponsiveContainer width="99%" height={500}>
              <LineChart width={600} height={300} data={repodetails}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getN} padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip/>
                <Legend />
                <Line name="commits" type="monotone" dataKey={getC} stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line name="insertions" type="monotone" dataKey={getI} stroke="#82ca9d" />
                <Line name="deletions" type="monotone" dataKey={getD} stroke="#00d2d2" />

              </LineChart>
              </ResponsiveContainer>

                {/* Timeline */}
              <ResponsiveContainer width="99%" height={500}>
              <ComposedChart
                width={500}
                height={400}
                data={repotime}
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey={getN} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar  name ="modified rows" dataKey={getT} barSize={20} fill="#82ca9d" />
                <Line name ="modified rows" type="monotone" dataKey={getT} stroke="#8884d8" />
              </ComposedChart>
              </ResponsiveContainer>

              {/* Responsibility */}
              {/* <BarChart
                width={500}
                height={300}
                data={data2}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="files" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
              </BarChart> */}

            </div>
            </Card>

            </Col>
            <Col span={3}></Col>

          </Row>
      )
    }
}

// export default View2;
