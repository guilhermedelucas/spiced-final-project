import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../navbar/navbar';
import DisplayList from './displaylist';
import { Container } from 'semantic-ui-react'


export default class MainPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            query: this.props.location.query
        };
    }

    componentWillMount() {
    axios.get('/test').then((response) => {
        this.setState({
            userData: response.data.userData
        })
        return response.data.userData
    });
    }

    componentWillReceiveProps() {
        console.log(this.props.location);
        axios.get('/test').then((response) => {
            this.setState({
                userData: response.data.userData
            })
            return response.data.userData
        });
    }
        // <NavBar userData={this.state.userData} query={this.props.location.query}/>

    render() {

        return (
            <div style={{display: "table", margin: "auto", display: "absolute", width:"100vw", heigth: "100vh"}}>
                <DisplayList userData={this.state.userData} query={this.props.location.query} />
            </div>
        )
    }
}
