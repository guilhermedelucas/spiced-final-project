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
import FriendItems from './components/frienditems/frienditemsmain';
import Messages from './components/messages/messagesmain'

const valideUserNotLogged = (nextState, replace, callback) => {
    axios.get('/getdata/loggedin/').then(function (response) {
        if (response.data.success == false) {
            replace('welcome');
        }
        callback();
    }).catch((err) => {
        callback();
    })
}

const validateUserLogged = (nextState, transition, callback) => {
    axios.get('/getdata/loggedin/').then(function (response) {
        if (response.data.success) {
            replace('home');
        }
        callback();
    }).catch((err) => {
        callback();
    })
}

ReactDOM.render(
        <Router history={browserHistory}>
            <Route name="additem" path="additem/(:query)" onEnter={valideUserNotLogged} component={AddMoreStuff}/>
            <Route name="mainview" path="home" onEnter={valideUserNotLogged} component={MainPageView}/>
            <Route name="profile" path="profile" onEnter={valideUserNotLogged} component={Profile}/>
            <Route name="register" path="register" onEnter={validateUserLogged} component={Register}/>
            <Route name="results" path="results/:query" onEnter={valideUserNotLogged} component={MainPageView}/>
            <Route name="search" path="search(/:query)" onEnter={valideUserNotLogged} component={SearchPage}/>
            <Route name="sgit" path="sgit/:query" onEnter={valideUserNotLogged} component={SingleItemDisplay}/>
            <Route name="welcome" path="/" onEnter={validateUserLogged} component={Home}/>
            <Route name="friendsitems" path="/frienditems/:query" onEnter={valideUserNotLogged} component={FriendItems}/>
            <Route name="friends" path="friends" onEnter={valideUserNotLogged} component={FriendsPage}/>
            <Route name="friendprofile" path="friendprofile/:query" onEnter={valideUserNotLogged} component={FriendProfile}/>
            <Route name="messages" path="mymessages" onEnter={valideUserNotLogged} component={Messages}/>

        </Router>,
    document.getElementById('main'));
