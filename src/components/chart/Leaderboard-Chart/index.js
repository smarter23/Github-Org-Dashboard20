import React, {Component} from 'react';
import draw from './vis';
class Chart extends Component {
    componentDidMount() {
        draw(this.props);
    }

    render() {
        return (
            <div className='bubble-barchart'/>
        )
    }
}

export default Chart;