import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import FormContainer from './formcontainer'
import NavBar from '../navbar/navbar'
import { Container } from 'semantic-ui-react'
import BookForm from './bookform';
import GamesForm from './bookform';
import MoviesForm from './moviesform';
import MusicForm from './musicform';
import SideBar from '../main/SideBarItems'



export default class AddMoreStuff extends React.Component {
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
        // console.log(query);
        if (query == '?collection=') {
            query = ""
        }
        this.setState({
          query
        })
    }

    changeForm(e){

    }

    render() {
        var form = "";
        var title = "";
        switch (this.props.routeParams.query) {
            case "addbook":
                title = "Add a new book to your collection";
                form = <BookForm/>
                break;
            case "addgames":
                title = "Add a new game to your collection";
                form = <GamesForm/>
                break;
            case "addmovies":
                title = "Add a new movie to your collection";
                form = <MoviesForm/>
                break
            case "addmusic":
                title = "Add a new album to your collection";
                form = <MusicForm/>
                break;
        }
        return (
            <div className="ui column stackable center page grid" style={{display: "table", margin: "auto"}}>
                <SideBar query={this.state.query}/>
                <NavBar userData={this.state.userData} handler={this.handler} query={this.state.query}/>
                <Container>
                    <h2>{ title }</h2>
                    { form }
                </Container>
            </div>
        );
    }
}
