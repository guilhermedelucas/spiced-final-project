import React from 'react';
import { Button, Card, Divider, Icon, Image, Item  } from 'semantic-ui-react';
import ProfileForm from "./friendprofileform";
import SideBar from '../sidebar/sidebaritems'
import TopBar from '../topbar/topbar'

export default class FriendProfileMain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            view: "grid"
        }
        this.onChildChanged = this.onChildChanged.bind(this);
    }


    onChildChanged(newState){
        this.setState({
            view: newState
        });
    }

    render() {
        return(
            <div style={content}>
                <TopBar callbackParent={this.onChildChanged} view={this.state.view}/>
                <SideBar query={this.props.location.query}/>
                <div className="ui raised very padded text container segment" style={{height: "100vh", overflow: "visible"}}>
                    <div style={{display:"inline-flex", flexDirection: "column", width: "100%"}}>
                        <ProfileForm currentFriend={this.props.params.query}/>
                    </div>
                </div>
            </div>
        )
    }

}



const content = {
    height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
