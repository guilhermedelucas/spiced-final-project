import axios from 'axios';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, Divider, Icon, Image, Item  } from 'semantic-ui-react';
import { browserHistory, Link } from 'react-router';



export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.view,
            value: ""
        }
    }

    changeView() {
        if (this.state.view == "list") {
            var newState = "grid";
                this.setState({ view: newState }); // we update our state
                this.props.callbackParent(newState); // we notify our parent
        } else {
            var newState = "list";
                this.setState({ view: newState }); // we update our state
                this.props.callbackParent(newState); // we notify our parent

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
        return (
        <div>
            <div className="ui pointing menu">
                <div className="right menu">
                    <a className="item active">
                        Home
                    </a>
                    <a className="item">
                        { (this.state.view == "grid") ? (<i className="grid layout icon" title="Grid View" onClick={() => this.changeView()}></i>) : (<i className="list layout icon" title="List View" onClick={() => this.changeView()}></i>) }
                    </a>
                    <a className="item" onClick={() => {this.logOut()}}  title="Log out">
                        <i className="power icon" alt="LogOut"></i>
                    </a>
                    <a className="item">
                        <Link to="/mymessages" style={{color: "black"}}>
                            <i className="mail icon"></i>
                        </Link>
                    </a>
                    <a className="item" style={{paddingRight: "30px"}}>
                        <Link to="/search">
                            <i className="search link icon" title="Search"></i>
                        </Link>
                    </a>
                </div>
            </div>
        </div>
        )
    }
}
