import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import { Card,Row,Col } from 'antd';
import { Select } from 'antd';

// import './View1.css';

const { Option } = Select;

const data = [
  {"name": "Angad Sharma", 
  "gravatar": "https://www.gravatar.com/avatar/5e8def242c2dd4eede4822fe2f8944b4?default=identicon", 
  "commits":  1, 
  "insertions":  53, 
  "deletions": 0, 
  "percentage-of-changes":  1.42 }, 
  {"name":  "AshDarkfold", 
  "gravatar": "https://www.gravatar.com/avatar/ecb219a7bb5a426385082e35bb2fc1fa?default=identicon",
   "commits": 11, 
   "insertions": 497, 
   "deletions":  82, 
   "percentage-of-changes":15.56
  } ]
   
class View2 extends PureComponent{

  constructor(props){
    super(props);
    this.state = {
      access_token: localStorage.getItem('access_token'),
      repodata: []

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
      })
      .catch(err => console.log(err))
    }
  }

 onChange = (value) => {
    console.log(`selected ${value}`);
  }
  
  onBlur = () => {
    console.log('blur');
  }
  
  onFocus = () => {
    console.log('focus');
  }
  
  onSearch = (val) => {
    console.log('search:', val);
  }
    render(){

      const {repodata} = this.state;
      // console.log(repodata);
      var options = repodata.length ? (
        repodata.map(
          op => {
            // op = JSON.stringify(op)
            // console.log(op)
            return (
              <Option value={op.name} key={op.name}>{op.name}</Option>
            )
            
          }
        )
      ) :(
        <div></div>
      )
      // console.log(options)
        

        return(
          <Row>
            <Col span={20}>
            <Card style={{ margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Repo-vise contributions </h1>

              

              <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a repository"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>

              {/* {options} */}
              </Select>

              <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="commits" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="insertions" stroke="#82ca9d" />
                <Line type="monotone" dataKey="deletions" stroke="#00d2d2" />

              </LineChart>

            </div>
            </Card>

            </Col>
          </Row>
                  )
    }
}

export default View2;
