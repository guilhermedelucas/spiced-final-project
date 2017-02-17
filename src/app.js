import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, IndexRoute, browserHistory } from 'react-router';
import AddMoreStuff from './components/addmorestuff/addmorestuff';
import DisplayResultsView from './components/results/resultsmain'
import MainPageView from './components/main/mainpageview';
import Profile from  './components/profile/profilemain';
import Register from './components/register/registermain';
import SingleItemDisplay from './components/singleitemdisplay/singlemain';
import Home from './components/home/home';
import SearchPage from './components/search/searchview';
import FriendsPage from './components/friends/friendsview';
import FriendProfile from './components/friendprofile/friendprofilemain';



ReactDOM.render(
        <Router history={browserHistory}>
            <Route name="additem" path="additem/(:query)" component={AddMoreStuff}/>
            <Route name="mainview" path="home" component={MainPageView}/>
            <Route name="profile" path="profile" component={Profile}/>
            <Route name="register" path="register" component={Register}/>
            <Route name="results" path="results/:query" component={MainPageView}/>
            <Route name="search" path="search(/:query)" component={SearchPage}/>
            <Route name="sgit" path="sgit/:query" component={SingleItemDisplay}/>
            <Route name="welcome" path="/" component={Home}/>
            <Route name="friends" path="friends" component={FriendsPage}/>
            <Route name="friendprofile" path="friendprofile/:query" component={FriendProfile}/>
        </Router>,
    document.getElementById('main'));
