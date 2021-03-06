import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import DisplayList from './displaylist';
import SideBar from '../sidebar/sidebaritems'
import TopBar from '../topbar/topbar'
import { Container } from 'semantic-ui-react'


export default class MainPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            query: this.props.location.query,
            view: "grid"
        };
        this.onChildChanged = this.onChildChanged.bind(this);
    }

    componentWillMount() {
        axios.get('/getdata/userdata').then((response) => {
            this.setState({
                userData: response.data.userData[0]
            })
        })
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
                <DisplayList userData={this.state.userData} query={this.props.params.query} view={this.state.view}/>
            </div>
        )
    }
}
