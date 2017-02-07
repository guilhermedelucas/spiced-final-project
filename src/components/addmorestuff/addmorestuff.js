import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import FormContainer from './formcontainer'
import { Container } from 'semantic-ui-react'
import BookForm from './bookform';
import GamesForm from './gamesform';
import MoviesForm from './moviesform';
import MusicForm from './musicform';
import SideBar from '../sidebar/sidebaritems'
import TopBar from '../topbar/topbar'



export default class AddMoreStuff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
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
        var form = "";
        var title = "";
        switch (this.props.routeParams.query) {
            case "Books":
                title = "Add a new book to your collection";
                form = <BookForm title={title} query={this.props.params.query}/>
                break;
            case "Games":
                title = "Add a new game to your collection";
                form = <GamesForm title={title} query={this.props.params.query}/>
                break;
            case "Movies":
                title = "Add a new movie to your collection";
                form = <MoviesForm title={title} query={this.props.params.query}/>
                break
            case "Music":
                title = "Add a new album to your collection";
                form = <MusicForm title={title} query={this.props.params.query}/>
                break;
        }
        return (
            <div style={{display: "table", margin: "auto", display: "absolute", width:"100vw", heigth: "100vh", backgroundImage: "url(../../imgs/background.jpg)", backgroundSize:"cover"}}>
                <TopBar callbackParent={this.onChildChanged} view={this.state.view}/>
                <SideBar query={this.props.location.query}/>
                <div style={{width: "100vw", margin: "0",  maxWidth: "none", height: "100vh"}}>
                    <div style={content}>
                    { form }
                    </div>

                </div>
            </div>
        );
    }
}

const content = {
    margin:"0px", paddingLeft:"0px", height: "100vh",  width: "100vw", position: "relative", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
