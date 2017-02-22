import axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Label, Icon } from 'semantic-ui-react';
import StatsBar from './statsbar'
import ProfileRender from './renderprofile';
import FriendsListRender from './friendslistrender'

export default class FriendProfileForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            birthday: null, borrowed: [], city: null, country: null, email: null, friends: [], firstName: null, imageOnHover: true, items: [], job: null, lastName: null, lended: [], messages: [], password: null, phone: null, picture: null, uploadSuccess: false, username: null, usernameExists: false, emailExists: false, target: {_class: ""}, validation: { results: "" }, view:"profile"
        };
    }

    componentWillMount(){
        const { currentFriend } = this.props;
        axios.get('/getdata/frienddata/' + currentFriend).then((response) => {
                console.log(response);
                const { username, email, firstName, lastName, birthday, job, city, country, phone, picture, items, friends, borrowed, lended, messages } = response.data.userData.result[0];
                const { friendsTotal } = response.data;
                const { friendsData } = response.data;
                this.setState({
                    username, email, firstName, lastName, birthday, job, city, country, phone, picture,
                    items: items || [],
                    borrowed: borrowed || [],
                    lended: lended || [],
                    friendsTotal,
                    friendsData
                })
        });
    }

    onChangeView(view) {
        if (view == "profile") {
            this.setState({
                view: "profile"
            })
        } else if (view == "friends") {
            this.setState({
                view: "friends"
            })
        }

    }

    render(){

            const { username, email, firstName, lastName, birthday, job, city, country, phone, picture, items, friendsTotal, borrowed, lended, messages } = this.state;
            let $imagePreview = null;
            let toRender = null;

            const imageStyle = {
                width: "200px",height: "200px", borderRadius: "50%", backgroundPosition: "center center",  backgroundSize: "cover", backgroundImage: "url(." + picture + ")", margin:"auto", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)", marginTop: "-56px", border:"10px solid white"
            };
            if (picture) {
                $imagePreview = (
                    <div style={imageStyle}>
                        <div style={{position: "absolute", top: "80px", marginLeft: "20px"}}></div>
                    </div>
                );
            } else {
                $imagePreview = (
                    <div className="previewText" style={{color: "rgb(102, 102, 102)", fontWeigth: "bold"}}>No Picutre</div>
                );
            }


            if (this.state.view == "friends") {
                toRender = ( <FriendsListRender friendsList={this.state.friendsData} currentFriend={username}/> );
            } else {
                toRender =
                    ( <ProfileRender firstName={firstName} lastName={lastName} birthday={birthday} job={job} city={city} country={country} phone={phone} email={email} /> );
            }

        return(
            <div>
            {$imagePreview}
            <div style={{textAlign:"center", padding:"10px 0"}}>
                <h2>{username}</h2>
            </div>
            <StatsBar itemsTotal={items.length} friendsTotal={friendsTotal} borrowedTotal={borrowed.length} lendedTotal={lended.length} currentFriend={this.props.currentFriend} callbackParent={this.onChangeView.bind(this)}/>
                {toRender}
            </div>
        )
    }
}

const imageStyleHover = {
    width: "200px",height: "200px", borderRadius: "50%", backgroundColor: "white", margin:"auto", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)", marginTop: "-56px", border:"10px solid white"
};
