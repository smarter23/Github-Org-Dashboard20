import * as d3 from 'd3';
import './leaderboard.json';

const draw = (props) => {
    d3.json('../leaderboard.json')
    .then(data => data.text())
    .then(text => console.log(text))
}

export default draw;