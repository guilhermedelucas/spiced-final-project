import axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Label, Icon } from 'semantic-ui-react';
import Input, * as inputHelper from 'react-validated-input';
import StatsBar from './statsbar'

export default class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            birthday: null, borrowed: [], city: null, country: null, email: null, friends: [], firstName: null, imageOnHover: true, items: [], job: null, lastName: null, lended: [], messages: [], password: null, phone: null, picture: null, uploadSuccess: false, username: null, usernameExists: false, emailExists: false, target: {_class: ""}, validation: { results: "" }
        };
    }

    componentWillMount(){
        axios.get('/getdata/userdata').then((response) => {
            if (response.data.loggedIn) {
                const { username, email, firstName, lastName, birthday, job, city, country, phone, picture, items, friends, borrowed, lended, messages } = response.data.userData[0];
                const { friendsTotal } = response.data;
                this.setState({
                    username, email, firstName, lastName, birthday, job, city, country, phone, picture,
                    items: items || [],
                    borrowed: borrowed || [],
                    lended: lended || [],
                    friendsTotal
                })
                console.log(this.state.friendsTotal);
            } else {
                browserHistory.push('/');
            }
        });
    }

    updateProfile(){
        const firstName = !this.state.target.firstName ? this.state.firstName : this.state.target.firstName ;
        const lastName = !this.state.target.lastName ? this.state.lastName : this.state.target.lastName ;
        const birthday = !this.state.target.birthday ? this.state.birthday : this.state.target.birthday ;
        const job = !this.state.target.job ? this.state.job : this.state.target.job ;
        const city = !this.state.target.city ? this.state.city : this.state.target.city ;
        const country = !this.state.target.country ? this.state.country : this.state.target.country ;
        const phone = !this.state.target.phone ? this.state.phone : this.state.target.phone ;
        const picture = !this.state.target.picture ? this.state.picture : this.state.target.picture;
        const that = this;
            axios.post('/insertdata/updateprofile', {
            firstName, lastName, birthday, job, city, country, phone, picture
            })
            .then(function (response) {
                if (response.data.success) {
                    that.setState({
                        uploadSuccess: true
                    })
                }
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    handleImage(){
        this.refs.fileUploader.click();
    }

    sendImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        var file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                picture: reader.result
            });
        }
        reader.readAsDataURL(file)
        var formData = new FormData();
        formData.append('file', file);
        axios.post('/insertdata/saveimage', formData, {
            headers: {
                'Content-Type': false
            }
        }).then((response) => {
            if (response.data.success) {
                let imgUrl = "./uploads/" + response.data.file;
                this.setState({
                    picture: imgUrl,
                })
            } else {
                console.log("didin't worked");

            }
        });
    }

    mouseEnter(){
        this.setState({
            imageOnHover: false
        })
    }

    mouseLeave(){
        this.setState({
            imageOnHover: true
        })
    }

    render(){
        const { username, email, firstName, lastName, birthday, job, city, country, phone, picture, items, friendsTotal, borrowed, lended, messages } = this.state;
        console.log(this.state.friendsTotal);
        let $imagePreview = null;
        const imageStyle = {
            width: "200px",height: "200px", borderRadius: "50%", backgroundPosition: "center center",  backgroundSize: "cover", backgroundImage: "url(" + picture + ")", margin:"auto", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)", marginTop: "-56px", border:"10px solid white"
        };

        if (picture) {
            $imagePreview = (
                <div style={ this.state.imageOnHover ? imageStyle : imageStyleHover } onMouseEnter={() => {this.mouseEnter()}} onMouseLeave={() => {this.mouseLeave()}} onClick={(e) => this.handleImage(e)}>
                    <div style={{position: "absolute", top: "80px", marginLeft: "20px"}}>
                        { !this.state.imageOnHover ? ( <p style={{textAlign: "center"}}>Click here to change<br/>your profile image</p>) : null } </div>
                    <input type="file" id="file" ref="fileUploader" style={{display: "none"}} onChange={(e) => {this.sendImage(e)}}/>
                    </div>);
        } else {
            $imagePreview = (<div><div className="previewText" style={{color: "rgb(102, 102, 102)", fontWeigth: "bold"}}>Please select an Image for your profile</div>
            <input type="file" id="file" ref="fileUploader" onChange={(e) => {this.sendImage(e)}}/></div>)
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
                        <Input type="text" placeholder={"Insert your first name"} instance={this.state.target} propertyKey="firstName" style={inputStyle} defaultValue={firstName}/>
                    </div>
                    <div style={{flexGrow: 1, paddingLeft: "10px"}}>
                        <h3>Last name</h3>
                    <Input type="text" placeholder={"Insert your last name"} instance={this.state.target} propertyKey="lastName" style={inputStyle} defaultValue={lastName}/>
                    </div>
                </div>
                <div style={{display: "inline-flex", flexDirection:"row", width:"100%", margin: "10px 0"}}>
                    <div style={{flexGrow: 1, paddingRight: "10px"}}>
                        <h3>Birthday</h3>
                        <Input type="text" placeholder={"Select your birth date"} instance={this.state.target} propertyKey="birthday" style={inputStyle} defaultValue={birthday}/>
                    </div>
                    <div style={{flexGrow: 4, paddingLeft: "10px"}}>
                        <h3>Job</h3>
                        <Input type="text" placeholder={"Inform your profession"} instance={this.state.target} propertyKey="job" style={inputStyle} defaultValue={job}/>
                    </div>
                </div>
                <div style={{display: "inline-flex", flexDirection:"row", width:"100%", margin: "10px 0"}}>
                    <div style={{flexGrow: 1, paddingRight: "10px"}}>
                        <h3>City</h3>
                        <Input type="text" placeholder={"Inform your city name"} instance={this.state.target} propertyKey="city" style={inputStyle} defaultValue={city}/>
                    </div>
                    <div style={{flexGrow: 4, paddingLeft: "10px"}}>
                        <h3>Country</h3>
                        <Input type="text" placeholder={country || "Inform your first name"} instance={this.state.target} propertyKey="country" style={inputStyle} defaultValue={country}/>
                   </div>
               </div>
               <div style={{display: "inline-flex", flexDirection:"row", width:"100%", margin: "10px 0"}}>
                   <div style={{flexGrow: 1, paddingRight: "10px"}}>
                       <h3>Phone</h3>
                       <Input type="text" placeholder={"Insert your phone number"} instance={this.state.target} propertyKey="phone" style={inputStyle} defaultValue={phone}/>
                   </div>
                </div>
                <hr style={{width: "100%", margin: "20px 0"}}/>
                    {   this.state.uploadSuccess ?
                        <div className="ui success message">
                            <div class="header">Profile update completed</div>
                        </div> :
                    <div><button style={{width: "100%"}}onClick={this.updateProfile.bind(this)}>Update Profile</button><span>&nbsp;</span></div> }
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
