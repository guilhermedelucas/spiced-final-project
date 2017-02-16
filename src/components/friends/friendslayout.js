import axios from 'axios';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Input, * as inputHelper from 'react-validated-input';
import FriendsList from './friendsresults'



export default class  FriendsLayout extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {

        return (
            <div style={content}>
                <div className="ui raised very padded text container segment" style={{marginTop: "50px"}}>
                    <h2>Friends</h2>
                    <FriendsList list={this.state.friendsList}/>
                </div>
            </div>
        );
    }
}


const content = {
    height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)",
}
