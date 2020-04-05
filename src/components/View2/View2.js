import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar ,VictoryArea, VictoryChart, VictoryPolarAxis,
    VictoryTheme,VictoryStack } from 'victory';

// import './View1.css';

class View1 extends React.Component{
    render(){
        return(
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
        )
    }
}

export default View1;
