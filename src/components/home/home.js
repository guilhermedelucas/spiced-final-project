import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import Input, * as inputHelper from 'react-validated-input';


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            target: {},
            email: null,
            password: null,
            incorrectEmail: false,
            incorrectPassword: false
        };
    }

    componentWillMount(){
        axios.get('/getdata/loggedin').then((response) => {
            if (response.data.loggedIn) {
                browserHistory.push('/home');
            }
        });
    }

    login(){
        this.setState({
            incorrectEmail: false,
            incorrectPassword: false
        });
        const that = this;
        const { email, password } = this.state.target ;
            axios.post('/getdata/login', {
            email, password
            })
            .then(function (response) {
                if (!response.data.loggedIn) {
                    if (response.data.incorrectEmail) {
                        that.setState({
                            incorrectEmail: true
                        })
                    } else {
                        that.setState({
                            incorrectPassword: true
                        })
                    }
                } else {
                    browserHistory.push('/home');
                }
                // console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

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
                        <Input type="text" placeholder="Email" instance={this.state.target} propertyKey="email" style={ this.state.emailError || this.state.emailExists ? inputStyleError : inputStyle}/> <br />
                        { this.state.incorrectEmail ? (<p>Invalid e-mail, check the e-mail typed or register</p>) : null }

                        <Input type="password" placeholder="Password" instance={this.state.target} propertyKey="password" style={ this.state.passwordError ? inputStyleError : inputStyle}/>
                        { this.state.incorrectPassword ? (<p>The password doesn't match, try again!</p>) : null }<br />
                    <div><button style={inputStyle} onClick={this.login.bind(this)}>Login</button><span>&nbsp;</span></div>
                        <font style={{fontWeight:"bold", fontSize: "15px"}} className="input-field"><Link to='/register'>OR REGISTER HERE</Link></font>
                    </div>
                  </div>
        )
    }
}

const inputStyle = {
    padding: "0.67861429em 1em",
    fontSize: "1em",
    background: "#fafafa",
    border: "1px solid #cccccc",
    color: "rgba(0, 0, 0, 0.87)",
    borderRadius: "3px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.075) inset",
    transition: "color 0.1s ease, border-color 0.1s ease",
    width: "100%"
};

const inputStyleError = {
    padding: "0.67861429em 1em",
    fontSize: "1em",
    background: "rgb(257, 239, 243)",
    border: "1px solid",
    borderColor: "#8e1414",
    color: "rgba(0, 0, 0, 0.87)",
    borderRadius: "3px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.075) inset",
    transition: "color 0.1s ease, border-color 0.1s ease",
    width: "100%"
}
