import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import SideBar from '../sidebar/sidebaritems'
import TopBar from '../topbar/topbar'
import FriendsLayout from './friendslayout'


export default class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            query: this.props.location.query,
            view: "grid"
        };
        this.onChildChanged = this.onChildChanged.bind(this);
    }

    onChildChanged(newState){
        this.setState({
            view: newState
        });
    }

    render() {
        return (
            <div style={{display: "table", margin: "auto", display: "absolute", width:"100vw", heigth: "100vh"}}>
                <TopBar callbackParent={this.onChildChanged} view={this.state.view}/>
                <SideBar query={this.props.location.query}/>
                <FriendsLayout />
            </div>
        )
    }
}
