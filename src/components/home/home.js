import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class Home extends React.Component {


    render (){
        return (
                <div className="container" align="center">
                    <div className="css3_div">
                        <div className="txtcss">
                          <font style={{fontWeight:"300px", fontSize: "45px"}}>YOU</font> <font style={{fontWeight:"400px", fontSize: "45px"}}>COLLECT</font>
                          <br />
                          <font style={{fontWeight:"300px", fontSize: "18px"}}>AND LIST</font>
                        </div>
                    </div>
                    <div className="html5_div">
                      <div className="txthtml">
                        <font style={{fontWeight:"300px",fontSize: "45px"}}>YOU SHARE</font> <font style={{fontWeight:"400px", fontSize: "45px"}}>AND INTERACT</font>
                      </div>
                    </div>
                    <div className="trycss">
                        <img src="./imgs/caniborrowlogo.png" height="300px" />
                    </div>
                    <div className="shareit">
                        <font style={{fontWeight:"bold", fontSize: "18px"}}>Login</font><br />
                        Username
                        <input type="username" className="input-field"/> <br />
                        Passoword
                        <input type="password" className="input-field"/> <br /> <br />
                        <font style={{fontWeight:"bold", fontSize: "15px"}} className="input-field">OR REGISTER</font><Link to='home'>Hello</Link><br />
                    </div>
                  </div>
        )
    }
}
