import axios from 'axios';
import React from 'react';
import MessagesNavBar from "./messagesnavbar";
import moment from 'moment';
import { Link } from 'react-router';
import { List, Image, Divider, Button } from 'semantic-ui-react'


export default class MessageList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messageStatus: "from",
            index: 0,

        }
    }

    componentWillMount(){
        var that = this;
        axios.get('/getdata/mymessages').then((response) => {
            console.log(response);
            const { messages, friendData, currentUser } = response.data;

            var arrayOfSamples = [];
            var counter = 0;
            // friendData.map(function(item){
            //     messages.some(function(el){
            //         if (el.to === item.username || el.from === item.username) {
            //         arrayOfSamples.push(el);
            //         return el.to === item.username || el.from === item.username
            //         }
            //     })
            // })

            that.setState({
                messages, currentUser, friendData
            })
            //     if (_.some(messages, function(element){
            //         console.log(element.to, element.from);
            //         return ( element.to === item.username || element.from === item.username )
            //     })) {
            //         return item
            //     };
            // })

            // _.map(friendList, function(item){
            //     _.map(messages, function(element){
            //     item.username == element.to || element.from ?
            //     })
            // })
        })
    }

    onChangeView(name) {
        console.log(name);
        this.setState({
            messageStatus: name,
            index: 0
        })
    }

    paginateControl(controller) {
        const { index } = this.state;
        controller == "more" ? this.setState({
            index: (index + 6)
        }) : this.setState({
            index: (index - 6)
        })
    }


    render(){

        const { messages, messageStatus, currentUser, friendData, index } = this.state;


        if (messageStatus == "from") {
            var receivedMessages = _.filter(messages, function(item){
                if (item.from != currentUser) {
                    return item
                } else {
                    return
                }
            })
            _.map(receivedMessages, function(item){
                return _.filter(friendData, function(element){
                    if (element.username == item.from){
                        item.picture = element.picture
                    }
                })
            })
            var displayResults = _.map(receivedMessages.slice(index, index + 6), (item) => {
                return (
                    <div>
                        <div style={{display: "inline-flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                        <List>
                            <List.Item>
                                <Image avatar src={item.picture} />
                                <List.Content>
                                    <List.Header as='a'>{item.from}</List.Header>
                                    <List.Description>Send a message <a><b>{moment(item.sent).fromNow()}</b></a></List.Description>
                                    <List.Description> Message: {item.message} </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                        <Button floated='right' style={{height: "40px"}}>Reply</Button>
                        </div>
                        <Divider/>
                    </div>
                )
            })
        } else {
            var receivedMessages = _.filter(messages, function(item){
                if (item.from == currentUser) {
                    return item
                }
            })
            _.map(receivedMessages, function(item){
                return _.filter(friendData, function(element){
                    if (element.username == item.to){
                        item.picture = element.picture
                    }
                })
            })
            var displayResults = _.map(receivedMessages.slice(index, index + 6), (item) => {
                return (
                    <div>
                        <List>
                            <List.Item>
                                <Image avatar src={item.picture} />
                                <List.Content>
                                    <List.Header as='a'>{item.to}</List.Header>
                                    <List.Description>You sent a message <a><b>{moment(item.sent).fromNow()}</b></a></List.Description>
                                    <List.Description> Message: {item.message} </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                        <Divider/>
                    </div>
                )
            })
        }

        return(
            <div style={content}>
                <div className="ui raised very padded text container segment" style={{marginTop: "50px", overflowY: "auto"}}>
                    <MessagesNavBar callbackParent={this.onChangeView.bind(this)}/>
                    {displayResults}
                    { index >= 6 ? <Button.Group floated="left"><Button onClick={() => this.paginateControl("back")}>Back</Button></Button.Group>  : null} { receivedMessages.length > 6 && receivedMessages.length > index + 6 ? <Button.Group floated="right"><Button onClick={() => this.paginateControl("more")}>More</Button></Button.Group> : null }
                </div>
            </div>

        )
    }
}

const content = {
height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
