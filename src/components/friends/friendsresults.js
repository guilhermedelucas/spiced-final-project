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
            index: 0, currentUser: null, request: false, renderList: [], friendsList: [], waitingList: [], replyList: [], view: "friends"
        };
    }


    changeStatus(username) {
        var that = this;
        axios.post('/insertdata/frienstatus/', {username})
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
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
                renderList: this.state.friendsList,
                index: 0
            })
        } else if (view == "pending") {
            this.setState({
                view,
                renderList: this.state.replyList,
                index: 0
            })
        } else if (view == "sent"){
            this.setState({
                view,
                renderList: this.state.waitingList,
                index: 0
            })
        }
    }

    updateFriendList(username){
        var that = this;
        axios.get('/getdata/friendslist/').then(function (response) {
            that.setState({
                friendsList: response.data.friendsList,
                waitingList: response.data.waitingList,
                replyList: response.data.replyList,
                currentUser: response.data.currentUser,
                renderList: response.data.friendsList
            });
            that.onChangeView();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    paginateControl(controller) {
        const { index } = this.state;
        controller == "more" ? this.setState({
            index: (index + 15)
        }) : this.setState({
            index: (index - 15)
        })
    }

    render() {
        const { friendsList, waitingList, replyList, currentUser, view, index } = this.state;
        var arraryOfResults = [];
        _.map(this.state.renderList, (item) => {
            if (item.currentStatus == "no") {
                return
            } else {
                if(item.username_one != currentUser) {
                    arraryOfResults.push({username: item.username_one, picture: item.username_one_picture, currentStatus: item.currentStatus})
                } else if(item.username_two != currentUser)  {
                    arraryOfResults.push({username: item.username_two, picture: item.username_two_picture, currentStatus: item.currentStatus})
                }
            }
        })
        var displayFriends = _.map(arraryOfResults.slice(index, index + 15), (item) => {
            return (
                <List.Item>
                        <ButtonFriendsContoller view={view} userData={item.username} callbackParent={this.updateFriendList.bind(this)}/>
                    <Image avatar src={item.picture} />
                    <List.Content>
                        <Link to={"/friendprofile/" + item.username}>{item.username}</Link>
                    </List.Content>
                </List.Item>
            )
        })

        return (
            <div>
                <StatsBar friendsTotal={friendsList.length || 0} waitingTotal={waitingList.length || 0} replyTotal={replyList.length || 0} callbackParent={this.onChangeView.bind(this)}/>
            <List divided verticalAlign='middle'>
                {displayFriends}
            </List>
            { index >= 15 ? <Button.Group floated="left"><Button onClick={() => this.paginateControl("back")}>Back</Button></Button.Group>  : null} { arraryOfResults.length >= 15 && arraryOfResults.length >= index + 15 ? <Button.Group floated="right"><Button onClick={() => this.paginateControl("more")}>More</Button></Button.Group> : null }
            </div>
        );
    }
}
