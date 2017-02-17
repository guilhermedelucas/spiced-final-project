import axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Label, Icon } from 'semantic-ui-react';
import StatsBar from './statsbar'

export default class FriendProfileForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            birthday: null, borrowed: [], city: null, country: null, email: null, friends: [], firstName: null, imageOnHover: true, items: [], job: null, lastName: null, lended: [], messages: [], password: null, phone: null, picture: null, uploadSuccess: false, username: null, usernameExists: false, emailExists: false, target: {_class: ""}, validation: { results: "" }
        };
    }

    componentWillMount(){
        const { currentFriend } = this.props;
        console.log(this.props.currentFriend);
        axios.get('/getdata/frienddata/' + currentFriend).then((response) => {
                console.log(response);
                const { username, email, firstName, lastName, birthday, job, city, country, phone, picture, items, friends, borrowed, lended, messages } = response.data.userData.result[0];
                const { friendsTotal } = response.data;
                this.setState({
                    username, email, firstName, lastName, birthday, job, city, country, phone, picture,
                    items: items || [],
                    borrowed: borrowed || [],
                    lended: lended || [],
                    friendsTotal
                })
        });
    }


    render(){
        const { username, email, firstName, lastName, birthday, job, city, country, phone, picture, items, friendsTotal, borrowed, lended, messages } = this.state;
        let $imagePreview = null;

        console.log(username, email, firstName, lastName, birthday, job, city, country, phone, picture, items, friendsTotal, borrowed, lended, messages);
        console.log(this.state);
        const imageStyle = {
            width: "200px",height: "200px", borderRadius: "50%", backgroundPosition: "center center",  backgroundSize: "cover", backgroundImage: "url(." + picture + ")", margin:"auto", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)", marginTop: "-56px", border:"10px solid white"
        };

        console.log(picture);

        if (picture) {
            console.log("hello");
            $imagePreview = (
                <div style={imageStyle}>
                    <div style={{position: "absolute", top: "80px", marginLeft: "20px"}}></div>
                </div>
            );
        } else {
            console.log("hallo");
            $imagePreview = (
                <div className="previewText" style={{color: "rgb(102, 102, 102)", fontWeigth: "bold"}}>No Picutre</div>
            );
        }

        return(
            <div>
                {$imagePreview}
                <div style={{textAlign:"center", padding:"10px 0"}}>
                    <h2>{username}</h2>
                </div>
                <StatsBar itemsTotal={items.length} friendsTotal={friendsTotal} borrowedTotal={borrowed.length} lendedTotal={lended.length}/>
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

const imageStyleHover = {
    width: "200px",height: "200px", borderRadius: "50%", backgroundColor: "white", margin:"auto", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)", marginTop: "-56px", border:"10px solid white"
};
