import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './main/navbar';
import DisplayList from './main/displaylist';
import { Container } from 'semantic-ui-react'


export default class MainPageView extends React.Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            userData: [],
            query: this.props.location.hash
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

    handler(query) {
        if (query == '#collection=') {
            query = ""
        }
        console.log(query);
    this.setState({
      query
    })
  }

// class Child extendes React.Component {
//   render() {
//     return <Button onClick = {this.props.handler}/ >
//   }


    render() {
        return (
            <div className="ui column stackable center page grid" style={{display: "table", margin: "auto"}}>
                <Container fluid>
                    <NavBar userData={this.state.userData} handler = {this.handler}/>
                    <DisplayList userData={this.state.userData} query={this.state.query} />
                    </Container>
            </div>
        )
    }
}
