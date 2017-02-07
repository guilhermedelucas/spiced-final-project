import axios from 'axios';
import List from './list';
import queryString from 'query-string';
import React from 'react';
import { Button, Card, Divider, Icon, Image, Item  } from 'semantic-ui-react';
import SideBarItems from '../sidebar/sidebaritems'

export default class DisplayList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var query = queryString.parse(this.props.query);
        var list = "";
        console.log(query);
        var userCollection = _.sortBy(this.props.userData.items, function(item) {return item.dateadded}).reverse();
        //check if has properties selected
        if (!_.isEmpty(query)) {
            //case 1
            if (query.genre && query.collection) {
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.collection == query.collection && item.genre == query.genre
                });
                if (this.props.view == "grid") {
                var list = (
                        <Item>
                            <ul style={{margin: "0", padding: "0"}}>
                                <h1>{query.collection.toUpperCase()} > {query.genre.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                            </ul>
                        </Item>)
                    } else {
                var list = (
                    <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>

                            <h1>{query.collection.toUpperCase()}</h1>
                            <List child={groupByCollection} view={this.props.view}/>
                        </div>
                        )
                    }
            } else if (query.author) {
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.author == query.author
                });
                if (this.props.view == "grid") {
                    var list = (
                        <Item>
                            <ul style={{margin: "0", padding: "0"}}>
                                <h1>{query.author.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                            </ul>
                        </Item>)
                } else {
                    var list = (
                        <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
                                <h1>{query.author.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                        </div>
                    )
                }
            } else if (query.platform && query.genre) {
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.platform == query.platform && item.genre == query.genre
                });
                if (this.props.view == "grid") {
                var list = (
                        <Item>
                            <ul style={{margin: "0", padding: "0"}}>
                                <h1>{query.platform.toUpperCase()} > {query.genre.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                            </ul>
                        </Item>)
                    } else {
                var list = (
                    <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
                            <h1>{query.platform.toUpperCase()} > {query.genre.toUpperCase()}</h1>
                            <List child={groupByCollection} view={this.props.view}/>
                        </div>
                        )
                    }
            } else if (query.platform) {
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.platform == query.platform
                });
                if (this.props.view == "grid") {
                    var list = (
                        <Item>
                            <ul style={{margin: "0", padding: "0"}}>
                                <h1>{query.platform.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                            </ul>
                        </Item>)
                } else {
                    var list = (
                        <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
                                <h1>{query.platform.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                        </div>
                    )
                }
            } else if (query.collection && query.genre && query.media){
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.collection == query.collection && item.genre == genre && item.media == query.media
                });
                if (this.props.view == "grid") {
                var list = (
                        <Item>
                            <ul style={{margin: "0", padding: "0"}}>
                                <h1>{query.collection.toUpperCase()} > {query.genre.toUpperCase()} > {query.media.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                            </ul>
                        </Item>)
                    } else {
                var list = (
                    <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>

                            <h1>{query.collection.toUpperCase()} > {query.genre.toUpperCase()} > {query.media.toUpperCase()}</h1>
                            <List child={groupByCollection} view={this.props.view}/>
                        </div>
                        )
                    }
            } else if (query.collection && query.media){
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.collection == query.collection && item.media == query.media
                });
                if (this.props.view == "grid") {
                var list = (
                        <Item>
                            <ul style={{margin: "0", padding: "0"}}>
                                <h1>{query.collection.toUpperCase()} > {query.media.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                            </ul>
                        </Item>)
                    } else {
                var list = (
                    <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>

                            <h1>{query.collection.toUpperCase()} > {query.media.toUpperCase()}</h1>
                            <List child={groupByCollection} view={this.props.view}/>
                        </div>
                        )
                    }
            } else if (query.artist && query.media) {
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.artist == query.artist && item.media == query.media
                });
                if (this.props.view == "grid") {
                    var list = (
                            <Item>
                                <ul style={{margin: "0", padding: "0"}}>
                                    <h1>{query.artist.toUpperCase()} > {query.media.toUpperCase()}</h1>
                                    <List child={groupByCollection} view={this.props.view}/>
                                </ul>
                            </Item>)
                } else {
                    var list = (
                        <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
                                <h1>{query.artist.toUpperCase()} > {query.media.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                        </div>
                    )
                }
            } else if (query.artist) {
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.artist == query.artist
                });
                if (this.props.view == "grid") {
                    var list = (
                            <Item>
                                <ul style={{margin: "0", padding: "0"}}>
                                    <h1>{query.artist.toUpperCase()}</h1>
                                    <List child={groupByCollection} view={this.props.view}/>
                                </ul>
                            </Item>)
                } else {
                    var list = (
                        <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
                                <h1>{query.artist.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                        </div>
                    )
                }
            }
            else if (query.collection) {
                var groupByCollection = _.filter(userCollection, (item) => {
                    return item.collection == query.collection
                });
                if (this.props.view == "grid") {
                    var list = (
                        <Item>
                            <ul style={{margin: "0", padding: "0"}}>
                                <h1>{query.collection.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                            </ul>
                        </Item>)
                } else {
                    var list = (
                        <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
                                <h1>{query.collection.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.props.view}/>
                        </div>
                    )
                }
            }
        } else {
            if (this.props.view == "grid") {
                var groupByCollection = _.groupBy(userCollection, "collection");
                var list = _.keys(groupByCollection).map((item) => {
                    return (
                        <Item>
                            <ul style={{margin: "0", padding: "0"}}>
                                <h1>{item.toUpperCase()}</h1>
                                <List child={groupByCollection[item]} view={this.props.view}/>
                            </ul>
                        </Item>
                    )
                })
            } else {
                console.log("what the hell");
                var groupByCollection = _.groupBy(userCollection, "collection");
                    var list = _.keys(groupByCollection).map((item) => {
                        return (
                            <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
                                <h1>{item.toUpperCase()}</h1>
                                <List child={groupByCollection[item]} view={this.props.view} style={{display: 'inline-flex',
                    flexWrap: 'nowrap'}}/>
                                <br/>
                            </div>
                        )
                    })
                }
            }

    return(
            <div style={content}>
                <div style={{position: "relative", width: "90%"}}>
                    <div>
                        { this.props.view == "grid" ? (
                                <div className="ui raised very padded text container segment" style={{marginTop: "50px"}}>
                                    <Item.Group>
                                        {list}
                                    </Item.Group>
                                </div>
                            ) : (
                                <div style={{margin: "14px 0"}}>
                                    {list}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

}



const content = {
    height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
