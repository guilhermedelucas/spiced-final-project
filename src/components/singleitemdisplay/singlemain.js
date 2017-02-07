import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from '../sidebar/sidebaritems'
import TopBar from '../topbar/topbar'
import DisplayItem from './singledisplay'
import { Container } from 'semantic-ui-react'


export default class SingleItemDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData: [],
        };
    }

    onChildChanged(newState){
        this.setState({
            view: newState
        });
    }

    render() {
        console.log(this.props);
        return (
            <div style={{display: "table", margin: "auto", display: "absolute", width:"100vw", heigth: "100vh"}}>
                <TopBar callbackParent={this.onChildChanged} view={this.state.view}/>
                <SideBar query={this.props.location.query}/>
                <DisplayItem query={this.props.routeParams.query}/>
            </div>
        )
    }
}
