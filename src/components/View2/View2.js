import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'antd';
import { VictoryBar ,VictoryArea, VictoryChart, VictoryPolarAxis,
    VictoryTheme,VictoryStack } from 'victory';

// import './View1.css';

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
    }

  }
    render(){
        return(
          <Card style={{width:400, margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Repo-vise contributions </h1>

              <p style={{fontFamily: "monospace"}}>GDGVIT_template</p>

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
        )
    }
}

export default View2;
