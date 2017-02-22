import axios from 'axios';
import React from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';

export default class RenderProfile extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { firstName, lastName, birthday, job, city, country, phone, email } = this.props;
        console.log(this.props);


        return (
            <div>
                <div style={{display: "inline-flex", flexDirection:"row", width:"100%"}}>
                    <div style={{flexGrow: 1, paddingRight: "10px"}}>
                        <h3>First name</h3>
                        <input type="text" placeholder={"Insert your first name"} style={inputStyle} value={firstName} disabled/>
                    </div>
                    <div style={{flexGrow: 1, paddingLeft: "10px"}}>
                        <h3>Last name</h3>
                    <input type="text" placeholder={"Insert your last name"} style={inputStyle} value={lastName} disabled/>
                    </div>
                </div>
                <div style={{display: "inline-flex", flexDirection:"row", width:"100%", margin: "10px 0"}}>
                    <div style={{flexGrow: 1, paddingRight: "10px"}}>
                        <h3>Birthday</h3>
                        <input type="text" placeholder={"Select your birth date"} style={inputStyle} value={birthday} disabled/>
                    </div>
                    <div style={{flexGrow: 4, paddingLeft: "10px"}}>
                        <h3>Job</h3>
                        <input type="text" placeholder={"Inform your profession"} style={inputStyle} value={job} disabled/>
                    </div>
                </div>
                <div style={{display: "inline-flex", flexDirection:"row", width:"100%", margin: "10px 0"}}>
                    <div style={{flexGrow: 1, paddingRight: "10px"}}>
                        <h3>City</h3>
                        <input type="text" placeholder={"Inform your city name"} style={inputStyle} value={city} disabled/>
                    </div>
                    <div style={{flexGrow: 4, paddingLeft: "10px"}}>
                        <h3>Country</h3>
                        <input type="text" placeholder={country || "Inform your first name"} style={inputStyle} value={country} disabled/>
                   </div>
               </div>
               <div style={{display: "inline-flex", flexDirection:"row", width:"100%", margin: "10px 0"}}>
                   <div style={{flexGrow: 1, paddingRight: "10px"}}>
                       <h3>Phone</h3>
                       <input type="text" placeholder={"Insert your phone number"} style={inputStyle} value={phone} disabled/>
                   </div>
                   <div style={{flexGrow: 4, paddingRight: "10px"}}>
                       <h3>email</h3>
                       <input type="text" placeholder={"Insert your phone number"} style={inputStyle} value={email} disabled/>
                   </div>
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
