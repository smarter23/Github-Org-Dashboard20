import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar , VictoryChart, VictoryPolarAxis,
    VictoryTheme } from 'victory';

    
class View1 extends React.Component{
    render(){
        return(
            <VictoryChart polar
            theme={VictoryTheme.material}
            // domainPadding={20}
            height={200}
          >
            <VictoryPolarAxis dependentAxis
                labelPlacement="perpendicular"
                style={{ axis: { stroke: "none" } , tickLabel:{fontSize: "3px"} }}
                tickFormat={() => null}
            />
            <VictoryPolarAxis/>
            {/* <VictoryAxis
              width={200}
              height={200}
            //   tickValues={[1, 2, 3, 4]}
            //   tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
            /> */}
            <VictoryBar
              height={200}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}              
              style={{ data: { fill: "#c43a31",stroke: "black", strokeWidth: 0 } }}
              data={[
                {user: "L04DB4L4NC3R", contrib: 82},
                {user: "Angad Sharma", contrib: 16816},
                {user: "bhaveshgoyal27", contrib: 19},
                {user: "dependabot-preview[bot]" , contrib: 3743},
                {user: "shashu421" , contrib : 2150},
                {user: "HRITISHA", contrib: 1105},
                {user: "alan478", contrib: 8805},
                {user: "Krishn157", contrib: 930}
            ]}
              x="user"
              y="contrib"
            />
          </VictoryChart>
        )
    }
}

export default View1;
