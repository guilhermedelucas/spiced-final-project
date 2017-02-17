import axios from 'axios';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Results from './searchresults';
import { Button, Image, List } from 'semantic-ui-react'


export default class  SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: {},
            currentUser: {},
        };
    }

    componentWillMount(){

    }

    addFriend(username, picture, searchResult) {
        var that = this;

        axios.post('/insertdata/addfriend/', {username, picture})
        .then(function (response) {
            if (response.data.success) {
                _.map(searchResult, function(item, index){
                    item.username == username ? searchResult.splice(index, 1) : null
                })
            }
            that.props.callbackParent(searchResult);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { currentUser, searchResult, friendsRequest } = this.props;

        const filterSearchResult = _.filter(searchResult, (item) => {
            if (item.username != currentUser[0].username) {
                return item
            }
        })

        console.log(friendsRequest);

        _.map(filterSearchResult, (item) => {
            // console.log(item.username);
            console.log(_.some(friendsRequest, function(element){
                // console.log(element.username_one, element.username_two);
                return (element.username_one == item.username || element.username_two == item.username)
            }))
        });

        var displayResults = _.map(filterSearchResult, (item) => {
            return (
                <List.Item>
                    <List.Content floated='right'>
                        { _.some(friendsRequest, function(element){
                            return (element.username_one == item.username || element.username_two == item.username)
                        }) ? null : <Button onClick={() => this.addFriend(item.username, item.picture, searchResult)}>Add</Button>
                        }
                    </List.Content>
                    <Image avatar src={item.picture} />
                    <List.Content>
                        <Link to={"/friendprofile/" + item.username}>{item.username}</Link>
                    </List.Content>
                </List.Item>
            )
        })

        return (
            <List divided verticalAlign='middle'>
                {displayResults}
            </List>
        );
    }
}
