import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBoxPlot , VictoryChart, VictoryPolarAxis,
    VictoryTheme ,VictoryLegend, VictoryScatter,VictoryContainer} from 'victory';
import { Card } from 'antd';


class View1 extends React.Component{
    render(){
        return(
            <Card style={{width:700, margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Top Contributors</h1>

              <VictoryScatter
                height={120}
                data={[
                    { x: 1,  y:1, label: "CodeCombat", symbol: "star", size: 4 },
                    { x: 2,  y:4, label: "skin-cancer-detection", symbol: "square", size: 4 },
                    { x: 3,  y:6, label: "cc-website-prototype-19", symbol: "diamond", size: 4 },
                    { x: 4,  y:2, label: "github-orgs-api", symbol: "star", size: 4 },
                    { x: 5,  y:4, label: "digital-beacon", symbol: "star", size: 4 },
                    { x: 6,  y:6, label: "vit-tourist-guide", symbol: "triangleUp", size: 4 },
                    { x: 7,  y:2, label: "DevSoc2K19-Website", symbol: "star", size: 4 },
                    { x: 8,  y:4, label: "love-open-source", symbol: "star", size: 4 },
                    { x: 9,  y:6, label: "notes-map-analytics", symbol: "star", size: 4 },
                    { x: 10, y:2, label: "smart-park", symbol: "star", size: 4 },
                    { x: 11, y:6, label: "webinars", symbol: "circle", size: 4 },
                ]}
                labels={({ datum }) => datum.label}
                />
                <VictoryLegend  x={10} y={10}
                    containerComponent={<VictoryContainer/>}
                    // title="Legend"
                    centerTitle
                    orientation="horizontal"
                    symbolSpacer={2}
                    // itemsPerRow={4}
                    height={50}
                    borderPadding={{ top: 10, bottom: 0, left:10 }}
                    // padding={10}
                    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
                    data={[
                    { name: "Angad Sharma", symbol: {  type: "star" } },
                    { name: "shashu421", symbol: {type: "square" } },
                    { name: "HRITISHA", symbol: {  type: "diamond" } },
                    { name: "alan478", symbol: {  type: "triangleUp" } },
                    { name: "L04DB4L4NC3R", symbol: {  type: "circle" } },
                    ]}
                />
            </div>
            </Card>
        )
    }
}

export default View1;