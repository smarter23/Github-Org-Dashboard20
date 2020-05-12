import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBoxPlot , VictoryChart, VictoryPolarAxis,
    VictoryTheme ,VictoryLegend, VictoryScatter,VictoryContainer, VictoryStack, VictoryBar, VictoryGroup,VictoryArea} from 'victory';
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

    //   let y = {}
    //   this.state.topcontributors.map( el => {
    //     if (y[el.top_contributor] === undefined || y[el.top_contributor] === 0) {
    //     y[el.top_contributor] = 1
    //   } else {
    //     y[el.top_contributor] = y[el.top_contributor] + 1
    //   }
    // })
    // console.log(y)
    
    // let d = {}
    // let {topcontributors} = this.state;
    // for (var i = 0; i < topcontributors.length; i++) {
    //   var datum = topcontributors[i];
    //   if (!d[datum.top_contributor]) {
    //       d[datum.top_contributor] = [];
    //   }
    //   d[datum.top_contributor].push(datum.repo_name);
    // }

    var stackos =[] 
    const {topcontributors} = this.state;
    for (var i = 0; i < topcontributors.length; i++) {
      var stacko = <VictoryBar  data = {{x:topcontributors[i].top_contributor, y: 1}} key={topcontributors[i].top_contributor} />
      stackos.push(stacko)
    }
    console.log(stackos)
    // const stackdata = topcontributors.length ? (
    //   topcontributors.map(
    //     data => {
    //       return (
    //         <VictoryBar  data = {{x:data.top_contributor, y: 1}} />
    //       )
    //     }
    //   )
    // ): (
    //   <div> 0 </div>
    // )
    // var stack_data = this.state.topcontributors.map(data => {
    //   console.log(data)
    //   var stack = <VictoryBar  data = {{x:data.top_contributor, y: 1}} key={data.top_contributor} />
    // })

  //   var stacks = [] 
  //   console.log(d)
  //   for (var el of Object.keys(d)) {
  //     let data = []
  //     d[el].forEach(el => {
  //       // console.log(el)
  //       data.push({x: el, y: 1})   
  //       // console.log(data)             
  //     })
  //     var stack = (<VictoryBar  data = {data} key={data.x} />)
  //     stacks.push(stack)
  //     console.log(stacks)
  // }

        return(
          <Row>
            <Col span={18}>
            <Card style={{margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Top Contributors</h1>

              <VictoryChart  width={400}>
              {/* <VictoryGroup  style={{ data: { width: 15 } }}> */}
                  <VictoryStack
                  height={150}
                  colorScale={"blue"}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                  >
                  {/* {stackos} */}
                  </VictoryStack>
                {/* </VictoryGroup> */}
              </VictoryChart>

            
            </div>
            </Card>
            </Col>
          </Row>
            
        )
    }
}

export default View3;