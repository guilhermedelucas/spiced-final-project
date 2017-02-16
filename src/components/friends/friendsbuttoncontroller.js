import axios from 'axios';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Image, List } from 'semantic-ui-react'


export default class  ButtonFriendsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.view
        };
    }


    acceptFriend(usernameToAccept){
        axios.post('/insertdata/acceptfriend/', { usernameToAccept })
        .then(function (response) {
            console.log(response.data);
            // that.setState({
            //     searchResult: response.data.searchData
            // });
        })
        .catch(function (error) {
            console.log(error);
        });



    }

    removeFriend(usernameToRemove){


    }

    render() {
        const { view } = this.props;
        console.log(view);


        if (view == "friends"){
            return (
                <List.Content floated='right'>
                    <Button style={{backgroundColor:"green", color:"white", cursor:"none"}}>Friends</Button>
                </List.Content>
            );
        } else if(view =="pending"){
            return (
            <List.Content floated='right'>
                <Button.Group>
                  <Button style={{backgroundColor:"rgb(40, 128, 128)", color:"white"}} onClick={() => this.acceptFriend(this.props.userData)}>Accept</Button>
                  <Button.Or />
                  <Button style={{backgroundColor:"rgb(66, 35, 102)", color:"white"}} onClick={() => this.removeFriend(this.props.userData)}>Decline</Button>
                </Button.Group>
            </List.Content>
            );
        } else {
            return (
                <List.Content floated='right'>
                    <Button style={{backgroundColor:"gray", color:"white", cursor:"none"}}>Pedding</Button>
                </List.Content>
            )
        }
    }
}
