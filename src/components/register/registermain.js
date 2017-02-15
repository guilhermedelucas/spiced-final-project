import React from 'react';
import { Button, Card, Divider, Icon, Image, Item  } from 'semantic-ui-react';
import RegisterForm from "./registerform"

export default class Register extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return(
            <div style={content}>
                <div className="ui raised very padded text container segment" style={{height: "100vh", overflow: "visible"}}>
                    <div style={{display:"inline-flex", flexDirection: "column", width: "100%"}}>
                        <div style={{display:"inline-flex", flexDirection: "column", margin: "auto"}}>
                        <img src="../imgs/caniborrowblack200x200.png" width="200px"/>
                        <h1>Register now!</h1>
                        </div>
                        <hr style={{width: "100%", margin: "20px 0"}}/>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        )
    }

}



const content = {
    height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
