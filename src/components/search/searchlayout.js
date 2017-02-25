import axios from 'axios';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Input, * as inputHelper from 'react-validated-input';
import Results from './searchresults'



export default class  SearchLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            target: {radio: "friends"},
            search: {},
        };
    }

    search(){
        const { search, radio } = this.state.target;
        const that = this;
        if (search){
        axios.get('/getdata/search/' + search.toLowerCase() + "?searchtype=" + radio)
        .then(function (response) {
            console.log(response);
            that.setState({
                searchResult: response.data.searchData,
                currentUser: response.data.currentUserData,
                friendsRequest: response.data.friendsRequest,
                radio
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    } else {
        this.setState({
            target: {
                search: "Please insert a value"
            }
        })
        }
    }

    render() {

        return (
            <div style={content}>
                <div className="ui raised very padded text container segment" style={{marginTop: "50px"}}>
                    <h2>Search tool</h2>
                    <div style={{display: "inline-flex", flexDirection: "row", width:"100%"}}>
                        <Input type="text" instance={this.state.target} propertyKey="search" placeholder="" style={inputStyle} />
                        <div><button style={inputStyleButton} onClick={this.search.bind(this)}>Search  <i className="search link icon"></i></button></div>
                    </div>
                    <div id="searchInContainer" style={{
                        display: "inline-flex", justifyContent: "center", flexDirection: "row", width: "100%", fontSize: "0.85em"}}>
                        <div style={radioStyle}>
                            <Input type="radio" name="check" value="friends" instance={this.state.target} propertyKey="radio" style={{marginTop: "3px", verticalAlign: "top"}} label="  Friends" defaultChecked/>
                        </div>
                        <div style={radioStyle}>
                            <Input type="radio" name="check" value="items" instance={this.state.target} propertyKey="radio" style={{marginTop: "3px", verticalAlign: "top"}}  label="  Items" />
                        </div>
                    </div>
                    <Results searchResult={this.state.searchResult} currentUser={this.state.currentUser} friendsRequest={this.state.friendsRequest} callbackParent={this.search.bind(this)} search={this.state.radio} />
                </div>
            </div>
        );
    }
}


const content = {
    height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)",
}

const inputStyle = {
    padding: "0.78em 1em",
    fontSize: "0.85em",
    background: "#fafafa",
    border: "1px solid #cccccc",
    color: "rgba(0, 0, 0, 0.87)",
    borderRadius: "3px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.075) inset",
    transition: "color 0.1s ease, border-color 0.1s ease",
    width: "100%"
};

const inputStyleButton = {
    padding: "0.68em 1em",
    fontSize: "0.85em",
    background: "rgb(27, 25, 25)",
    border: "1px solid #cccccc",
    color: "rgb(255, 255, 255)",
    borderRadius: "3px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.075) inset",
    transition: "color 0.1s ease, border-color 0.1s ease",
    width: "100%"
};

const radioStyle = {
    padding: "0 10px"
}
