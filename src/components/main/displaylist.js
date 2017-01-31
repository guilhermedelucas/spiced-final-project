import axios from 'axios';
import List from './list';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, Divider, Icon, Image, Item  } from 'semantic-ui-react';
import SideBarItems from './sidebaritems'


export default class DisplayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "grid",
        }
    }

    toggleView(e) {
        e.preventDefault();
        if (this.state.view == "grid") {
            this.setState ({
                view: "list"
            })
        } else {
            this.setState({
                view: "grid"
            })
        }

    }

    render() {
            var query = this.props.query;
            let collection = query.collection;
            let genre = query.genre;
            if (!_.isEmpty(query)) {
                if (genre && collection) {
                    var groupByCollection = _.filter(this.props.userData.items, (item) => {
                        return item.collection == collection && item.genre == genre
                    });

                    if (this.state.view == "grid") {
                    var list = (
                            <Item>
                                <ul>
                                    <h1>{collection.toUpperCase()} > {genre.toUpperCase()}</h1>
                                    <List child={groupByCollection} view={this.state.view}/>
                                </ul>
                            </Item>)
                        } else {
                    var list = (
                            <div>
                                <h1>{collection.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.state.view}/>
                            </div>
                            )
                        }
                } else if (collection) {
                var groupByCollection = _.filter(this.props.userData.items, (item) => {
                    return item.collection == collection
                });
                if (this.state.view == "grid") {
                    var list = (
                            <Item>
                                <ul>
                                    <h1>{collection.toUpperCase()}</h1>
                                    <List child={groupByCollection} view={this.state.view}/>
                                </ul>
                            </Item>)
                        } else {
                    var list = (
                            <div>
                                <h1>{collection.toUpperCase()}</h1>
                                <List child={groupByCollection} view={this.state.view}/>
                            </div>
                            )
                        }
            }
        } else {
                var groupByCollection = _.groupBy(this.props.userData.items, "collection");
                if (this.state.view == "grid") {
                var list = _.keys(groupByCollection).map((item) => {
                    return (
                        <Item>
                            <ul>
                                <h1>{item.toUpperCase()}</h1>
                                <List child={groupByCollection[item]} view={this.state.view}/>
                            </ul>
                        </Item>
                        )
                    })
                } else {
                    var list = _.keys(groupByCollection).map((item) => {
                        return (
                            <div>
                                <h1>{item.toUpperCase()}</h1>
                                <List child={groupByCollection[item]} view={this.state.view} style={{display: 'inline-flex',
                    flexWrap: 'nowrap'}}/>
                                <br/>
                            </div>

                    )
                })
            }
        }

        return(
            <div style={{width: "100vw", margin: "0",  maxWidth: "none", backgroundColor: "#373B44", height: "100vh"}}>
                <div style={{backgroundColor: "rgb(28, 28, 28)", color: "white", position: "fixed", height: "100%", left: "0px", top: "0", width: "200px",     boxShadow: "-21px 16px 52px 21px rgba(0,0,0,0.4)", zIndex:2}}>
                    <li className="item" style={{minWidth:"200px", listStyle: "none"}}>
                        <img src="imgs/icons/logo.png" width="200px" style={{marginTop: "15px"}}/>
                  </li>
                  <Divider />
                    <SideBarItems query={this.props.query}  />
                </div>
                <div style={content}>
                    <div style={{position: "relative", width: "90%"}}>
                    <Button onClick={this.toggleView.bind(this)} style={{marginLeft: "85%"}}>{ (this.state.view == "grid") ? (<i className="grid layout icon"></i>) : (<i className="list layout icon"></i>) }</Button>
                    </div>
                        <div>
                            {
                                (this.state.view == "grid") ? (
                                    <Item.Group>
                                        {list}
                                    </Item.Group>
                                ) : (
                                    <div style={{margin: "14px 0", paddingLeft: "40px"}}>
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
    marginLeft:"200px", height: "100vh",  width: "100vw", position: "relative", backgroundColor:"white", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
