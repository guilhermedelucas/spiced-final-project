import axios from 'axios';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Results from './searchresults';
import { Button, Image, List } from 'semantic-ui-react';


export default class  SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
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
        const { currentUser, searchResult, friendsRequest, search } = this.props;
        console.log(search);

        if (search == "friends") {
        const filterSearchResult = _.filter(searchResult, (item) => {
            if (item.username != currentUser[0].username) {
                return item
            }
        })

        _.map(filterSearchResult, (item) => {
            _.some(friendsRequest, function(element){
                return (element.username_one == item.username || element.username_two == item.username)
            })
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

    } else {

        const arraryOfResults =[];

        _.map(searchResult, function(item){
            arraryOfResults.push({
                name: item.item.firstName,
                genre: item.item.genre,
                imgUrl: item.item.imgUrl,
                collection: item.item.collection,
                platform: item.item.platform,
                album: item.item.album,
                artist: item.item.artist,
                publisher: item.item.publisher,
                director: item.item.director,
                actors: item.item.actors,
                media: item.item.media,
                username: item.username
            })
        })

        const sortedArrayOfResults = _.sortBy(arraryOfResults, 'name');

        var displayResults = _.map(sortedArrayOfResults, function(item) {
            return(
            <List.Item>
                <List.Content floated='right'>
                    <Button>Add</Button>
                </List.Content>
                <Image avatar src={item.imgUrl} />
                <List.Content>
                    {item.name} { " > " + item.platform || " > " + item.media || "" } {" > " + item.genre}< br/>
                    <Link to={"/friendprofile/" + item.username}>{item.username}</Link>
                </List.Content>
            </List.Item>
            )
        })
    }

        return (
            <List divided verticalAlign='middle'>
                {displayResults}
            </List>
        );
    }
}
