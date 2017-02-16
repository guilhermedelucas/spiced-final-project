import axios from 'axios';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Results from './searchresults';
import { Button, Image, List } from 'semantic-ui-react'


export default class  SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){

    }

    addFriend(username) {
        var that = this;

        axios.post('/insertdata/addfriend/', {username, picture})
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

    render() {
        const { currentUser, searchResult } = this.props;

        const filterSearchResult = _.filter(searchResult, (item) => {
            if (item.username != currentUser[0].username) {
                return item
            }
        })

        const friendsList = [];

        _.filter(currentUser, (item) => {
            _.filter(item.friends, (list) => {
                friendsList.push(list.username)
            })
        })

        _.map(filterSearchResult, (item) => {
        console.log(_.some(friendsList, (element) => {
            console.log(element, item.username);
            return item.username == element })
            );
        })

        console.log(friendsList);

        var displayResults = _.map(filterSearchResult, (item) => {
            return (
                <List.Item>

                    { _.some(friendsList, (element) => {
                        return item.username == element }) ? null : (<List.Content floated='right'>
                            <Button onClick={() => this.addFriend(item.username, item.picture)}>Add</Button>
                        </List.Content>)
                    }
                    <Image avatar src={item.picture} />
                    <List.Content>
                        {item.username}
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
