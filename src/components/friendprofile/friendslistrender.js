import axios from 'axios';
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Button, Label, Icon, List, Image } from 'semantic-ui-react';


export default class FriendProfileForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0
        }
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
            const { friendsList, currentFriend } = this.props;
            const { index } = this.state;
            var arraryOfResults = [];

            _.map(friendsList, (item) => {
                    if(item.username_one != currentFriend) {
                        arraryOfResults.push({username: item.username_one, picture: item.username_one_picture, currentStatus: item.currentStatus})
                    } else if(item.username_two != currentFriend)  {
                        arraryOfResults.push({username: item.username_two, picture: item.username_two_picture, currentStatus: item.currentStatus})
                    }
            })

            console.log(arraryOfResults);

            var displayFriends = _.map(arraryOfResults.slice(index, index + 15), (item) => {
                console.log(index, item);
                return (
                    <List.Item>
                        <Image avatar src={"." + item.picture} />
                        <List.Content>
                            <Link to={"/friendprofile/" + item.username}>{item.username}</Link>
                        </List.Content>
                    </List.Item>
                )
            })

            return (
                <div>
                <List divided verticalAlign='middle'>
                    {displayFriends}
                </List>
                { index >= 15 ? <Button.Group floated="left"><Button onClick={() => this.paginateControl("back")}>Back</Button></Button.Group>  : null} { arraryOfResults.length >= 15 && arraryOfResults.length >= index + 15 ? <Button.Group floated="right"><Button onClick={() => this.paginateControl("more")}>More</Button></Button.Group> : null }
                </div>
            );
        }
    }
