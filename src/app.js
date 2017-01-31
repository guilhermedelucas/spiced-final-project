import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory, Router, Route, IndexRoute, browserHistory} from 'react-router';
import AddMoreStuff from './components/addmorestuff/addmorestuff';
import MainPageView from './components/main/mainpageview.js';

class MyApp extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
};
        render() {
            return (
            <div>
                <MainPageView/>
            </div>
            )
        }
    }

    ReactDOM.render(
            <Router history={browserHistory}>
                    <Route name="mainview" path="/(:query)" component={MainPageView}/>
                    <Route name="results" path="results:query" component={MainPageView}/>
                <Route name="addmorestuff" path="addmorestuff/:query" component={AddMoreStuff}/>

            </Router>,
        document.getElementById('main'));
