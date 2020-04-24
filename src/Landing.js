import React, {Component} from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import backdrop from './images/bg.png';

const CLIENT_ID =  "Iv1.5552b1340c6af2eb";
// const REDIRECT_URI = "https://github-dashboard-org.netlify.com/dashboard";
const REDIRECT_URI = "http://localhost:3000/dashboard";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state ={
          
        }
    }
    render(){
        return (
            <div className="background">
                <div className="landing-data">
                    <div className="background-title">
                        <h1> Github Dashboard 2020 </h1>
                    </div>
                    <div className="background-content">
                        <p>Wanted to visualize your github account? Click on this button to find out more, some more about github and this project maybe</p>
                    </div>

                    <div className="button">
                        <Button type ="primary" className="authenticate">
                            <a 
                            href = {`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:repo%20read:user%20read:org&redirect_uri=${REDIRECT_URI}`}>
                            Authenticate 
                            </a>
                        </Button>
                </div>
                </div>
            </div>
        )
    }
}

export default Landing;