import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MainPageView from './components/mainpageview.js';

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
                <Route path="/" component={MainPageView}/>
            </Router>,
        document.getElementById('main'));
