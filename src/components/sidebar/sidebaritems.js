import axios from 'axios';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import { Item, Divider, Label } from 'semantic-ui-react';
import { Link, browserHistory } from 'react-router';
import AddMoreNavBar  from '../sidebar/addmorenav'


export default class SideBarItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar: [],
            nestedView: this.props.nestedView,
            menuOpen: true,
            leftPosition: 0
        }
    }

    componentDidMount() {
        axios.get('/getdata/navbar').then((response) => {
            if (response.data.loggedIn) {
                this.setState({
                    navbar: response.data.navbar,
                })
            } else {
                browserHistory.push('/');
            }
        });
    }

    dropdown(e){
        if ($(".hide" + e).css("display") == "none") {
            $(".hide" + e).css("display", "block");
            $(".top" + e).css("color", "white");
        } else {
            $(".hide" + e).css("display", "none");
            $(".top" + e).css("color", "rgba(255,255,255,.5)");
        }
    }

    moveMenu(e){
        var that = this;
        var newPosition = this.state.leftPosition;
        if (this.state.menuOpen) {
            function timeout() {
                if (newPosition > -230) {
                    setTimeout(() => {
                        newPosition = newPosition - 2;
                        that.setState({
                            leftPosition: newPosition
                        })
                        timeout();
                    }, 5);
                }
            }
            timeout();
            this.setState({
                menuOpen: false
            })
        } else {
            function timeout() {
                if (newPosition < 0) {
                    console.log("it started");
                    setTimeout(() => {
                        newPosition = newPosition + 2;
                        that.setState({
                            leftPosition: newPosition
                        })
                        timeout();
                    }, 5);
                }
            }
            timeout();
            this.setState({
                menuOpen: true
            })
        }
    }

    logOut(){
        axios.get('/getdata/logout').then((response) => {
            if (response.data.loggedOut) {
                browserHistory.push('/');
            } else {
                console.log("hello");
            }
        });
    }

    render() {
        const whiteBarOnTop = {
            padding: "13px 10px 10px", backgroundColor: "white", width: "280px", marginRight: "-70px", height: "45px", boxShadow: "rgba(0, 0, 0, 0.4) -21px 16px 52px 21px", zIndex: "2", position: "absolute",  top: "110px", left: this.state.leftPosition
        }
        let { leftPosition } = this.state.leftPosition
        var nestedObject = {};
        var nestedView = this.state.nestedView;
        var query = this.props.query;
        let collection = query.collection;
        var list = _.map(this.state.navbar, (item) => {
            return (
                <div>
                    <Link to={'/results/collection=' + item._id}>
                        <h5 style={linksList} className={ "top" + item._id } value={item._id} onClick={() => this.dropdown(item._id)}>{item._id}
                            { $(".hide" + item._id).css("display") == "block" ? <i className="caret up icon"></i> : <i className="caret down icon"></i>}
                        </h5>
                    </Link>
                    <ul style={{paddingLeft: "20px", display: "none", marginTop: "0px"}} className={ "hide" + item._id}>
                        { item.genre.length ? <a className="item" style={{margin: "10px 0px 0px 0px", color:"rgba(255,255,255,.5)"}}>Genres </a> : null}
                            {_.map(item.genre, (element) => {
                                return (
                                    <Link to={'/results/collection=' + item._id + '&genre=' + element}>
                                        <li style={{marginLeft: "10px", listStyle: "none", color: "rgba(255,255,255,.5)"}}>{element}</li>
                                    </Link>
                                )
                            })}
                        { item.platform.length ? <h5 style={{margin: "10px 0px 0px 0px", color:"rgba(255,255,255,.5)"}}>Consoles / Platforms</h5> : null}
                        {_.map(item.platform, (element) => {
                            return (
                                <Link to={'/results/collection=' + item._id + '&platform=' + element}>
                                    <li style={{marginLeft: "10px", listStyle: "none", color: "rgba(255,255,255,.5)"}}>{element}</li>
                                </Link>)
                        })}
                        { item.media.length ? <h5 style={{margin: "10px 0px 0px 0px", color:"rgba(255,255,255,.5)"}}>Media type</h5> : null}
                        {_.map(item.media, (element) => {
                            return (
                                <Link to={'/results/collection=' + item._id + '&media=' + element}>
                                    <li style={{marginLeft: "10px", listStyle: "none", color: "rgba(255,255,255,.5)"}}>{element}</li>
                                </Link>)
                        })}
                    </ul>
                    <Divider style={{margin: "5px 0px"}}/>
                </div>
            )
        })

        return(
                <div>
                    <div style={whiteBarOnTop} onClick={() => this.moveMenu()}>
                        <h4 style={{textAlign:"right", color: "rgb(28, 28, 28)"}}>
                        { this.state.menuOpen ?  <i className="toggle left icon"></i> : <i className="toggle right icon"></i> }
                    </h4>
                    </div>
                <div style={{backgroundColor: "rgb(28, 28, 28)", color: "white", position: "fixed", height: "100%", left: this.state.leftPosition, top: "0", width: "230px",  boxShadow: "-21px 16px 52px 21px rgba(0,0,0,0.4)", zIndex:2, overflowY:"auto"}}>
                    <li className="item" style={{minWidth:"200px", listStyle: "none"}}>
                        <img src="../imgs/caniborrowlogo.png" width="200px" style={{padding: "10px 10px 10px 20px", marginTop: "15px", marginLeft: '10px'}}/>
                    </li>
                    <Divider style={{margin: "5px 0px"}}/>
                    <Link to="/profile">
                        <li style={{padding: "10px 10px 10px 20px", listStyle: "none", color:"white"}}>PROFILE</li>
                    </Link>
                    <Divider style={{margin: "5px 0px"}}/>
                    <AddMoreNavBar/>
                    <Divider style={{margin: "5px 0px"}}/>
                    <Link to="/home">
                        <li style={{padding: "10px 10px 10px 20px", listStyle: "none", color:"white"}}>ALL MY STUFF</li>
                    </Link>
                    <Divider style={{margin: "5px 0px"}}/>
                    <Link to="/friends">
                        <li style={{padding: "10px 10px 10px 20px", listStyle: "none", color:"white"}}>FRIENDS</li>
                    </Link>
                        <Divider style={{margin: "5px 0px"}}/>
                    {list}
                    <li style={{padding: "10px 10px 10px 20px", listStyle: "none", color:"white", cursor: "pointer"}} onClick={() => {this.logOut()}}><img src="../imgs/icons/logout.png" height="15px" /> LOG OUT</li>
                </div>
                </div>
        )
    }
}


var linksList = {
    listStyle: "none",
    color: "rgba(255,255,255,.5)",
    padding: "10px 0 10px 20px",
};
