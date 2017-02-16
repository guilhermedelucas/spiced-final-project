import axios from 'axios';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Image, List } from 'semantic-ui-react'
import StatsBar from './statsbar'
import ButtonFriendsContoller from './friendsbuttoncontroller'


export default class  FriendsResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null, request: false, renderList: [], friendsList: [], waitingList: [], replyList: [], view: "friends"
        };
    }


    changeStatus(username) {
        var that = this;

        axios.post('/insertdata/frienstatus/', {username})
        .then(function (response) {
            // console.log(response.data.searchData);
            // that.setState({
            //     searchResult: response.data.searchData
            // });
        })
        .catch(function (error) {
            console.log(error);
        });


        // axios.post('/insertdata/addfriend', {
        //     username
        // })
        // .then(function (response) {
        //     console.log("hello");
        //     if (response.data.sucess) {
        //         that.setState({
        //             usernameExists: false,
        //             emailExists: false
        //         })
        //        browserHistory.push('/profile');
        //     }  else if (response.data.username == false){
        //        console.log("username");
        //        that.setState({
        //            usernameExists: true
        //        })
        //    } else if (response.data.email == false){
        //        console.log("email");
        //        that.setState({
        //            emailExists: true,
        //            usernameExists: false
        //        })
        // })
    }

    componentDidMount(){
        var that = this;
        axios.get('/getdata/friendslist/').then(function (response) {
            that.setState({
                friendsList: response.data.friendsList,
                waitingList: response.data.waitingList,
                replyList: response.data.replyList,
                currentUser: response.data.currentUser,
                renderList: response.data.friendsList
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    onChangeView(view) {
        if (view == "friends") {
            this.setState({
                view,
                renderList: this.state.friendsList
            })
        } else if (view == "pending") {
            this.setState({
                view,
                renderList: this.state.waitingList
            })
        } else {
            this.setState({
                view,
                renderList: this.state.replyList
            })
        }
    }

    render() {
        const { friendsList, waitingList, replyList, currentUser, view} = this.state;

        var arraryOfResults = [];
        console.log(friendsList, waitingList, replyList, currentUser);

        _.map(this.state.renderList, (item) => {
            if(item.username_one != currentUser) {
                console.log("one");
                arraryOfResults.push({username: item.username_one, picture: item.username_one_picture, currentStatus: item.currentStatus})
            } else if(item.username_two != currentUser)  {
                console.log("two");
                console.log(item.username_two_picture);
                arraryOfResults.push({username: item.username_two, picture: item.username_two_picture, currentStatus: item.currentStatus})
            }
        })

        console.log(arraryOfResults);

        var displayFriends = _.map(arraryOfResults, (item) => {
            return (
                <List.Item>
                        <ButtonFriendsContoller view={view} userData={item.username} />
                    <Image avatar src={item.picture} />
                    <List.Content>
                        {item.username}
                    </List.Content>
                </List.Item>
            )
        })

        // var displayPending = _.map(waitingList, (item) => {
        //     re
        // })

        return (
            <div>
                <StatsBar friendsTotal={friendsList.length || 0} waitingTotal={waitingList.length || 0} replyTotal={replyList.length || 0} callbackParent={this.onChangeView.bind(this)}/>
            <List divided verticalAlign='middle'>
                {displayFriends}
            </List>
            </div>
        );
    }
}
