import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBoxPlot , VictoryChart, VictoryPolarAxis,
    VictoryTheme ,VictoryLegend, VictoryScatter,VictoryContainer, VictoryStack, VictoryBar} from 'victory';
import { Card,Row,Col } from 'antd';


class View3 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          access_token: localStorage.getItem('access_token'),
          topcontributors: []
    
        }
      }
    
      componentDidMount(){
        console.log(this.props);
        if(localStorage.getItem('access_token')){
          fetch('http://dscinfo.herokuapp.com/topcontributors?org=GDGVIT',{
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
              topcontributors : resp.payload
            })
            console.log(this.state.topcontributors)
          })
          .catch(err => console.log(err))
        }
        
      }
    render(){

      let y = {}
      this.state.topcontributors.map( el => {
        if (y[el.top_contributor] === undefined || y[el.top_contributor] === 0) {
        y[el.top_contributor] = 1
      } else {
        y[el.top_contributor] = y[el.top_contributor] + 1
      }
    })
    console.log(y)
    
    let d = {}
    let {topcontributors} = this.state;
    for (var i = 0; i < topcontributors.length; i++) {
      var datum = topcontributors[i];
      if (!d[datum.top_contributor]) {
          d[datum.top_contributor] = [];
      }
      d[datum.top_contributor].push(datum.repo_name);
    }
    console.log(d)
    for (var el of Object.keys(d)) {
      let data = []
      d[el].forEach(el => {
        // console.log(el)
        data.push({x: el, y: 1})   
        // console.log(data)             
      })
      const stack = (<VictoryBar data = {data} />)
  }

        return(
          <Row>
            <Col span={18}>
            <Card style={{margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Top Contributors</h1>
              <VictoryStack
               colorScale={["#087e8b", "#c1839f", "gold"]}
              >
              {stack}
              </VictoryStack>
            
            </div>
            </Card>
            </Col>
          </Row>
            
        )
    }
}

export default View3;