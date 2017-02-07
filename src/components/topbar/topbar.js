import axios from 'axios';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, Divider, Icon, Image, Item  } from 'semantic-ui-react';


export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.view,
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

    render() {
        return (
        <div>
            <div className="ui pointing menu">

              <div className="right menu">
                  <a className="item active">
                    Home
                  </a>
                  <a className="item">
                    Messages
                  </a>
                  <a className="item">
                    Friends
                  </a>
                  <a className="item">
                    { (this.state.view == "grid") ? (<i className="grid layout icon" onClick={() => this.changeView()}></i>) : (<i className="list layout icon" onClick={() => this.changeView()}></i>) }
                  </a>
                <div className="item">
                  <div className="ui transparent icon input">
                    <input type="text" placeholder="Search..."/>
                    <i className="search link icon"></i>
                  </div>
                </div>
              </div>
            </div>
            </div>
        )
    }
}

// <div className="ui segment">
//     <p></p>
// </div>
