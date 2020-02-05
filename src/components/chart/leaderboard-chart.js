import React from 'react';

import * as d3 from 'd3';

const Chart = (props) => {
    d3.json("http://dscinfo.herokuapp.com/leaderboard?org=GDGVIT").then(function(data){
        console.log(data)
    })
}

export default Chart;