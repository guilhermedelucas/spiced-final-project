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

    componentDidMount(){
        new Vivus('letters', {duration: 200}, function(obj) {
            console.log("vivus");
            $('#cletter').attr('style', 'fill:white');
            $('#aletter').attr('style', 'fill:white');
            $('#nletter').attr('style', 'fill:white');
            $('#iletter').attr('style', 'fill:white');
            $('#bletter').attr('style', 'fill:white');
            $('#oletter').attr('style', 'fill:white');
            $('#rletter1').attr('style', 'fill:white');
            $('#rletter2').attr('style', 'fill:white');
            $('#oletter2').attr('style', 'fill:white');
            $('#wletter').attr('style', 'fill:white');
            $('#questionletter').attr('style', 'fill:white');
            obj.el.classList.add('finished');
            $("#forms").addClass('finished');
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
                <div className="container" align="center" style={{textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center"}}>

                    <svg version="1.1" id="letters" fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     viewBox="970 390 486 480" width="100%" height="310px">
                        <path id="cletter" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1052.7,567.4c-9.6,0-17.7-1.2-24.5-3.5
                        c-6.8-2.3-12.1-5.8-16.1-10.4c-3.9-4.6-6.8-10-8.6-16.1c-1.8-6.1-2.7-13.4-2.7-21.7v-55.7c0-8.4,0.9-15.6,2.7-21.8
                        c1.8-6.1,4.6-11.5,8.6-16.1c3.9-4.6,9.3-8,16.1-10.4c6.8-2.3,14.9-3.5,24.5-3.5c7.6,0,14.3,0.7,20.1,2.2c5.8,1.5,10.6,3.5,14.3,6
                        s6.8,5.8,9.1,9.6c2.4,3.8,4,7.9,5,12.2c1,4.3,1.5,9.2,1.5,14.5v13.9h-40.3v-16.9c0-2.2-0.1-4-0.2-5.3c-0.1-1.3-0.5-2.9-1.1-4.7
                        c-0.6-1.8-1.6-3.1-3-4s-3.2-1.4-5.5-1.4c-1.8,0-3.4,0.3-4.7,1c-1.3,0.7-2.3,1.5-3,2.4c-0.7,0.9-1.2,2.2-1.6,3.7
                        c-0.4,1.6-0.6,2.9-0.7,4.1c-0.1,1.2-0.2,2.6-0.2,4.2v75.9c0,1.6,0.1,3,0.2,4.2s0.4,2.6,0.8,4.1c0.4,1.5,0.9,2.8,1.6,3.7
                        c0.7,1,1.7,1.8,3,2.4c1.3,0.7,2.8,1,4.6,1c2.2,0,4-0.4,5.5-1.3s2.4-2.2,3-4c0.6-1.8,0.9-3.4,1.1-4.7c0.1-1.3,0.2-3.1,0.2-5.4v-17.7
                        h40.3v13.8c0,5.4-0.5,10.3-1.5,14.7c-1,4.4-2.6,8.5-5,12.4c-2.4,3.9-5.4,7.2-9.1,9.8s-8.5,4.7-14.3,6.3
                        C1067.1,566.7,1060.3,567.4,1052.7,567.4z"/>
                    <path id="aletter" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1098.2,565l30.4-154.3h47.7l30.1,154.3h-37.5
                        l-5.3-30.8H1142l-5.1,30.8H1098.2z M1145.2,512.5h15.1l-7.6-57.6L1145.2,512.5z"/>
                    <path id="nletter" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1206.8,565V410.7h29.1l30.6,66.1v-66.1h33.8V565h-28
                        l-30.4-72.6V565H1206.8z"/>
                    <path id="iletter" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1346.3,565V410.7h40.9V565H1346.3z"/>
                        <path id="bletter" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1000.6,706.4V569.3h37.1c3.6,0,6.9,0.1,9.8,0.3
                        c2.9,0.2,6,0.6,9.3,1.2s6.2,1.5,8.7,2.5c2.5,1,4.9,2.5,7.3,4.3c2.4,1.8,4.3,4,5.8,6.5c1.4,2.5,2.6,5.6,3.5,9.3
                        c0.8,3.2,1.2,6.8,1.2,10.7c0,0.5,0,1,0,1.6c-0.3,15.4-7,24.4-20.1,27.1c7.8,0.7,13.8,3.9,18,9.5s6.4,13.2,6.6,22.9
                        c0,0.4,0,0.8,0,1.2c0,13.7-3.6,23.8-10.9,30.1c-7.5,6.6-18.3,9.8-32.3,9.8H1000.6z M1034.1,623.5h4.5c6.1,0,10.1-1.4,12.2-4.2
                        c2.1-2.8,3.1-7,3.1-12.7c0-4.4-1.3-8-3.9-10.9c-2.6-2.9-6.1-4.3-10.4-4.3h-5.5V623.5z M1034.1,683h4.5c6.1,0,10.4-1.5,12.9-4.5
                        c2.5-3,3.8-7.6,3.8-13.8c0-7.4-1.2-12.5-3.6-15.4c-2.4-2.9-6.7-4.3-12.9-4.3h-4.7V683z"/>
                    <path id="oletter" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1164.1,705.5c-5.5,2-12.2,3-20.1,3
                        c-7.8,0-14.5-1-20-3c-5.5-2-9.9-5-13.1-9c-3.3-4-5.6-8.7-7-14.1c-1.4-5.4-2.1-11.8-2.1-19.2v-50.6c0-7.4,0.7-13.8,2.1-19.2
                        c1.4-5.4,3.8-10.1,7-14.1c3.3-4,7.6-7,13.1-9c5.5-2,12.2-3,20-3c7.8,0,14.5,1,20.1,3c5.5,2,9.9,5,13.2,9c3.3,4,5.7,8.7,7.1,14.1
                        c1.5,5.4,2.2,11.8,2.2,19.2v50.6c0,7.4-0.7,13.8-2.2,19.2c-1.5,5.4-3.8,10.1-7.1,14.1C1174.1,700.5,1169.7,703.5,1164.1,705.5z
                         M1144.1,685.3c1.8,0,3.3-0.4,4.5-1.2s2-2,2.5-3.5c0.5-1.5,0.8-2.9,1-4.2c0.1-1.3,0.2-2.8,0.2-4.7V604c0-1.9-0.1-3.4-0.2-4.7
                        c-0.1-1.3-0.5-2.7-1-4.2s-1.3-2.7-2.5-3.5c-1.2-0.8-2.6-1.2-4.5-1.2c-1.5,0-2.8,0.3-3.8,0.9c-1,0.6-1.8,1.3-2.4,2.1
                        c-0.5,0.8-0.9,1.9-1.2,3.3c-0.3,1.4-0.4,2.6-0.5,3.5c0,0.9,0,2.2,0,3.8v67.7c0,1.5,0,2.8,0,3.7c0,0.9,0.2,2.1,0.5,3.5
                        c0.3,1.4,0.7,2.5,1.2,3.3c0.5,0.8,1.3,1.5,2.4,2.1C1141.3,685,1142.6,685.3,1144.1,685.3z"/>
                    <path id="rletter1" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1204.9,706.4V569.3h40.9c5.8,0,11,0.3,15.5,0.9
                        c4.5,0.6,8.8,1.7,12.9,3.3c4.1,1.6,7.5,3.7,10.1,6.4c2.6,2.7,4.7,6.1,6.2,10.4c1.5,4.3,2.3,9.3,2.3,15.1c0,9.2-1.2,16.5-3.5,22
                        s-6.8,9.9-13.3,13.3l18.7,65.7h-35.1l-14.2-60.6h-6.9v60.6H1204.9z M1238.4,627.4h8.8c5.5,0,9.3-1.6,11.5-4.8
                        c2.1-3.2,3.2-7.7,3.2-13.5c0-5.6-1-10-3-13c-2-3.1-5.3-4.6-10-4.6h-10.4V627.4z"/>
                    <path id="rletter2" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1000.6,848V710.9h40.9c5.8,0,11,0.3,15.5,0.9
                        c4.5,0.6,8.8,1.7,12.9,3.3c4.1,1.6,7.5,3.7,10.1,6.4c2.6,2.7,4.7,6.1,6.2,10.4c1.5,4.3,2.3,9.3,2.3,15.1c0,9.2-1.2,16.5-3.5,22
                        c-2.3,5.5-6.8,9.9-13.3,13.3l18.7,65.7h-35.1l-14.2-60.6h-6.9V848H1000.6z M1034.1,769h8.8c5.5,0,9.3-1.6,11.5-4.8
                        c2.1-3.2,3.2-7.7,3.2-13.5c0-5.6-1-10-3-13c-2-3.1-5.3-4.6-10-4.6h-10.4V769z"/>
                    <path id="oletter2" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1160.1,847.2c-5.5,2-12.2,3-20.1,3
                        c-7.8,0-14.5-1-20-3c-5.5-2-9.9-5-13.1-9c-3.3-4-5.6-8.7-7-14.1c-1.4-5.4-2.1-11.8-2.1-19.2v-50.6c0-7.4,0.7-13.8,2.1-19.2
                        c1.4-5.4,3.8-10.1,7-14.1c3.3-4,7.6-7,13.1-9c5.5-2,12.2-3,20-3c7.8,0,14.5,1,20.1,3c5.5,2,9.9,5,13.2,9c3.3,4,5.7,8.7,7.1,14.1
                        c1.5,5.4,2.2,11.8,2.2,19.2v50.6c0,7.4-0.7,13.8-2.2,19.2c-1.5,5.4-3.8,10.1-7.1,14.1C1170.1,842.1,1165.6,845.2,1160.1,847.2z
                         M1140,826.9c1.8,0,3.3-0.4,4.5-1.2c1.2-0.8,2-2,2.5-3.5c0.5-1.5,0.8-2.9,1-4.2c0.1-1.3,0.2-2.8,0.2-4.7v-67.7
                        c0-1.9-0.1-3.4-0.2-4.7c-0.1-1.3-0.5-2.7-1-4.2c-0.5-1.5-1.3-2.7-2.5-3.5c-1.2-0.8-2.6-1.2-4.5-1.2c-1.5,0-2.8,0.3-3.8,0.9
                        c-1,0.6-1.8,1.3-2.4,2.1c-0.5,0.8-0.9,1.9-1.2,3.3c-0.3,1.4-0.4,2.6-0.5,3.5c0,0.9,0,2.2,0,3.8v67.7c0,1.5,0,2.8,0,3.7
                        c0,0.9,0.2,2.1,0.5,3.5c0.3,1.4,0.7,2.5,1.2,3.3c0.5,0.8,1.3,1.5,2.4,2.1C1137.3,826.6,1138.6,826.9,1140,826.9z"/>
                    <path id="wletter" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1203.1,848l-14.6-137.1h28.4l6.3,74.4l7.9-74.4h22
                        l8.7,73.7l6.4-73.7h28.2L1281.6,848h-30.1l-9.5-77.4l-8.7,77.4H1203.1z"/>
                    <path id="questionletter" stroke="white" strokeWidth="3px" fill="none" strokeMiterlimit="10" d="M1330.9,773.3v-43.5c15.9-12.6,28.7-27.2,38.4-43.8
                            c8.6-14.6,12.9-29.1,12.9-43.5c0-2.1-0.1-4.2-0.3-6.4c-0.5-6-2.1-9.9-4.7-11.6c-2.6-1.8-5.9-2.7-9.9-2.7c-3.3,0-6.1,1.3-8.5,3.9
                            c-2.4,2.5-3.6,5.9-3.6,10.3c0,2.5,0.1,4.6,0.3,6.4c0.2,1.7,0.4,3,0.7,3.8c0.2,0.8,0.7,2.2,1.4,4.2c0.7,2,1.3,3.7,1.7,5l-53.6,12.7
                            c-0.3-1.4-0.9-3.6-1.7-6.6c-0.8-3-1.3-5-1.5-6c-0.2-1-0.6-2.6-1.1-4.8c-0.5-2.2-0.8-3.9-0.9-5.3c-0.1-1.4-0.2-3-0.4-5.1
                            c-0.2-2-0.2-4.1-0.2-6.3c0-0.4,0-0.9,0-1.3c0-8.4,1-16,2.9-23c2.2-7.2,5.7-13.8,10.5-20c4.8-6.1,11.7-10.9,20.5-14.3
                            c8.9-3.4,19.5-5.1,31.8-5.1c24.4,0,43.1,6,56.1,17.9c13,11.9,19.5,28.7,19.5,50.3c0,19.3-5.5,38.9-16.4,58.8
                            c-10.9,19.9-24,34.2-39.3,43v32.7H1330.9z M1329.4,845.3v-56h57.8v56H1329.4z"/>
                    </svg>




                    <div id="forms">
                        <Input type="text" placeholder="Email" instance={this.state.target} propertyKey="email" style={ this.state.emailError || this.state.emailExists ? inputStyleError : inputStyle}/> <br />
                        { this.state.incorrectEmail ? (<p>Invalid e-mail, check the e-mail typed or register</p>) : null }

                        <Input type="password" placeholder="Password" instance={this.state.target} propertyKey="password" style={ this.state.passwordError ? inputStyleError : inputStyle}/>
                        { this.state.incorrectPassword ? (<p>The password doesn't match, try again!</p>) : null }<br />
                        <div><button style={inputStyle} onClick={this.login.bind(this)}>Login</button><span>&nbsp;</span></div>
                        <font style={{fontWeight:"bold", fontSize: "15px", color: "white"}} className="input-field"><Link to='/register' style={{color:" white"}}>OR REGISTER HERE</Link></font>
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
    width: "280px",
    margin: "auto"
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
    width: "280px",
        margin: "auto"
    }
