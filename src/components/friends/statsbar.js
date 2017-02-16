import React from 'react';
import Input, * as inputHelper from 'react-validated-input';
import { Link, browserHistory } from 'react-router';


export default class StatsBar extends React.Component {
    constructor(props){
        super(props);
    }

    listController(view){
        this.props.callbackParent(view)
    }

    render() {
        let { friendsTotal, waitingTotal, replyTotal } = this.props
        return (
            <div className="ui pointing menu center" style={{justifyContent:"center"}}>
                <a className="item" style={{borderLeft: "1px solid #D4D4D5", backgroundColor: "rgba(0, 0, 0, 0.0470588)"}} onClick={() => this.listController("friends")}>
                <p style={{lineHeight: "1em"}} >Friends<span style={label}>{friendsTotal || 0}</span></p>
                </a>
                <a className="item" style={{backgroundColor: "rgba(0, 0, 0, 0.0470588)"}} onClick={() => this.listController("pending")}>
                <p style={{lineHeight: "1em"}}>Pending Requests<span style={label}>{waitingTotal || 0}</span></p>
                </a>
                <a className="item" style={{backgroundColor: "rgba(0, 0, 0, 0.0470588)"}} onClick={() => this.listController("sent")}>
                <p style={{lineHeight: "1em"}}>Requests Sent  <span style={label}>{replyTotal || 0}</span></p>
                </a>
            </div>
    )}
}


const label = {
    color: "white",
    backgroundColor: "gray",
    display: "inline-block",
    padding: "4px",
    borderRadius: "50%",
    fontSize: ".7em",
    textAlign: "center",
    minWidth: "22px"
};
