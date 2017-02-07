import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory, Router, Route, IndexRoute, browserHistory} from 'react-router';
import AddMoreStuff from './components/addmorestuff/addmorestuff';
import DisplayResultsView from './components/results/resultsmain'
import MainPageView from './components/main/mainpageview';
import SingleItemDisplay from './components/singleitemdisplay/singlemain';
import Home from './components/home/home';


ReactDOM.render(
        <Router history={browserHistory}>
            <Route name="welcome" path="/" component={Home}/>
            <Route name="mainview" path="home" component={MainPageView}/>
            <Route name="results" path="results/:query" component={MainPageView}/>
            <Route name="addmorestuff" path="addmorestuff/:query" component={AddMoreStuff}/>
            <Route name="sgit" path="sgit/:query" component={SingleItemDisplay}/>
        </Router>,
    document.getElementById('main'));
