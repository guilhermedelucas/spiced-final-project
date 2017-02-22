import axios from 'axios';
import React from 'react';
import MessagesNavBar from "./messagesnavbar";

export default class MessageList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentWillMount(){
        axios.get('/getdata/mymessages').then((response) => {
            console.log(response);
            const messages = response.data.messages;
            const friendList = response.data.friendData;

            console.log(friendList);
            var arrayOfSamples = [];
            var counter = 0;
            friendList.map(function(item){
                messages.some(function(el){
                    if (el.to === item.username || el.from === item.username) {
                    arrayOfSamples.push(el);
                    return el.to === item.username || el.from === item.username
                    }
                })
            })

            console.log(arrayOfSamples);



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


    render(){

        return(
            <div style={content}>
                <div className="ui raised very padded text container segment" style={{marginTop: "50px"}}>
                    <MessagesNavBar callbackParent={this.onChangeView.bind(this)}/>
                </div>
            </div>

        )
    }
}

const content = {
height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
