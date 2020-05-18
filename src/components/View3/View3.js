import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Card,Row,Col } from 'antd';

const CustomTooltip = ({ active, payload, label }) => {
    console.log(payload)
    if (active) {
      return (
        <div className="custom-tooltip">
          {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }
  
    return null;
  };
class View3 extends PureComponent{

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

      let y = []
      this.state.topcontributors.map( el => {
          console.log(el)
        if (y[el.score] === undefined || y[el.score] === 0) {
        // y[el.top_contributor] = 1
        y.push({top_contributor: el.top_contributor, score: 1, repo_name: el.repo_name})
      } else {
        // y[el.top_contributor] = y[el.top_contributor] + 1
        // y.push({top_contributor: el.top_contributor, score: y[el.score] + 1, repo_name: el.repo_name})
        y[el.score] = y[el.score] + 1
      }
    })
    console.log(y)
    
    let d = []
    let {topcontributors} = this.state;
    for (var i = 0; i < topcontributors.length; i++) {
      var datum = topcontributors[i];
      if (!d[datum.top_contributor]) {
          d[datum.top_contributor] = [];
      }
      d[datum.top_contributor].push(datum.repo_name);
    }
    console.log(d)

    const result = topcontributors.reduce((acc, d) => {
      const found = acc.find(a => a.top_contributor === d.top_contributor);
      //const value = { name: d.name, val: d.value };
      const value = { repo_name: d.repo_name }; // the element in data property
      if (!found) {
        //acc.push(...value);
        acc.push({top_contributor:d.top_contributor, data: [value]}) // not found, so need to add data property
      }
      else {
        //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
        found.data.push(value) // if found, that means data property exists, so just push new element to found.data.
      }
      return acc;
    }, []);
    console.log(result)

    var c = result.map(el => {
      var o = Object.assign({}, el);
      o.count = el.data.length;
      return o;
  })

  console.log(c)

  //   result= topcontributors.reduce(function(r,a){
  //     console.log(r,a)
  //     r["top_contributor"] = r[a.top_contributor] || [];
  //     r["top_contributor"].push(a)
  //     return r;
  // }, Object.create(null));

  //   console.log(result)

    // for (var i = 0; i < topcontributors.length; i++) {
    //   var datum = topcontributors[i];
    //   if (!(datum.top_contributor in l[i].top_contributor)) {
    //       l[datum.top_contributor] = [];
    //   }
    //   l.push({name: datum.top_contributor ,repo: datum.repo_name});
    // }



        return(
          <Row>
            <Col span={3}></Col>
            <Col span={18}>
            <Card style={{margin :20}}>
            <div>
              <h1 style={{textAlign:"center"}}>Top Contributors</h1>
              <ResponsiveContainer width="99%" height={500}>

                    <AreaChart
                width={500}
                height={400}
                data={c}
                margin={{
                top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="top_contributor" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stackId="1" stroke="#8884d8" fill="#8884d8" />
                {/* <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" /> */}
                {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
            </AreaChart>
            </ResponsiveContainer>
            </div>
            </Card>
            </Col>
            <Col span={3}></Col>
          </Row>
            
        )
    }
}

export default View3;