import React from 'react';
import ReactDOM from 'react-dom';
import { Card,Row,Col } from 'antd';
import { Select } from 'antd';
import { VictoryBar ,VictoryArea, VictoryChart, VictoryPolarAxis,
    VictoryTheme,VictoryStack } from 'victory';

// import './View1.css';

const { Option } = Select;



class View2 extends React.Component{

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
      console.log(repodata);
      var options = repodata.length ? (
        repodata.map(
          op => {
            op = JSON.stringify(op)
            // console.log(op)
            return (
              <Option value={op.name} key={op.name}>{op.name}</Option>
            )
            
          }
        )
      ) :(
        <div><Option value="loading" key="loading"> Loading </Option></div>
      )
      // console.log(options)
      const selectrepos =    
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
        return(
          <Row>
            <Col span={20}>
            <Card style={{ margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Repo-vise contributions </h1>

              

            {selectrepos}

              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                height={150}
              >
                <VictoryStack
                  colorScale={["blue","cyan"]}
                >
                  <VictoryArea
                    data={[{x: "Angad Sharma", y: 1}]}
                  />
                  <VictoryArea
                    data={[{x: "L04DB4L4NC3R", y: 2}]}
                  />
                </VictoryStack>
              </VictoryChart>
            </div>
            </Card>

            </Col>
          </Row>
                  )
    }
}

export default View2;
