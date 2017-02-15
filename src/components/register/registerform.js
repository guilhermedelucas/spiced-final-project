import axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'semantic-ui-react';
import Input, * as inputHelper from 'react-validated-input'



export default class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            usernameExists: false,
            email: null,
            emailExists: false,
            password: null,
            target: {_class: ""},
            validation: {
                results: "",
            }
        };
    }


    doValidateAll(){
    const that = this;
    const { email, password, username } = this.state.target;
    console.log(email, password, username);
      inputHelper.validate(this, [this.state.target], null, ["validation"])
         .then(
             () => {
                 axios.post('/insertdata/registeruser', {
                     username, email, password
                 })
                 .then(function (response) {
                     if (response.data.sucess) {
                         that.setState({
                             usernameExists: false,
                             emailExists: false
                         })
                        browserHistory.push('/profile');
                     }  else if (response.data.username == false){
                        console.log("username");
                        that.setState({
                            usernameExists: true
                        })
                    } else if (response.data.email == false){
                        console.log("email");
                        that.setState({
                            emailExists: true,
                            usernameExists: false
                        })
                    }
                    console.log(response);
                 })
                 .catch(function (error) {
                     console.log(error);
                 });
                this.setState({
                    emailError: null,
                    usernameError: null,
                    passwordError: null,
                })


               console.log("hello");
             },
             (errorMessage) => {
                 const error = this.state.validation.results;
                    this.setState({
                        emailError: error.email,
                        usernameError: error.username,
                        passwordError: error.password,
                    })
             }
           )
           .catch((err) => console.log(err))
    }



    render(){
        return(
            <div>
                <h3>Username:</h3>
                <Input type="text" placeholder="Username" rules={{presence:true}} instance={this.state.target} propertyKey="username" validate={this.state.validation} style={this.state.usernameError || this.state.usernameExists ? inputStyleError : inputStyle}/>
                { this.state.validation.results.username ? (<p>{this.state.usernameError}</p>) : null }
                { this.state.usernameExists ? (<p>This username is already in use</p>) : null }
                <h3>E-mail:</h3>
                <Input type="email" placeholder="Email" rules={{presence:true, email:true}} instance={this.state.target} propertyKey="email" validate={this.state.validation} style={ this.state.emailError || this.state.emailExists ? inputStyleError : inputStyle}/>
                { this.state.validation.results.email ? (<p>{this.state.emailError}</p>) : null}
                { this.state.emailExists ? (<p>This email is already in use</p>) : null }
                <h3>Password:</h3>
                <Input type="password" placeholder="Password" rules={{presence:true}} instance={this.state.target} propertyKey="password" validate={this.state.validation} style={ this.state.passwordError ? inputStyleError : inputStyle}/>
                { this.state.validation.results.password ? (<p>{this.state.passwordError}</p>) : null }

                <hr style={{width: "100%", margin: "20px 0"}}/>
                <button style={{width: "100%"}}onClick={this.doValidateAll.bind(this)}>Submit</button> <span>&nbsp;</span>

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
}

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
