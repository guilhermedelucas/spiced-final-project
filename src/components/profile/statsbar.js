import React from 'react';
import Input, * as inputHelper from 'react-validated-input';
import { Link, browserHistory } from 'react-router';



export default class StatsBar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let { itemsTotal, friendsTotal, borrowedTotal, lendedTotal } = this.props
        return (
            <div className="ui pointing menu center" style={{justifyContent:"center"}}>
                <a className="item" style={{borderLeft: "1px solid #D4D4D5", backgroundColor: "rgba(0, 0, 0, 0.0470588)"}}>
                <Link to="home"><p style={{lineHeight: "1em"}}>Items  <span style={label}>{itemsTotal || 0}</span></p></Link>
                </a>
                <a className="item" style={{backgroundColor: "rgba(0, 0, 0, 0.0470588)"}}>
                <Link to="friendlist"><p style={{lineHeight: "1em"}}>Friends  <span style={label}>{friendsTotal || 0}</span></p></Link>
                </a>
                <a className="item" style={{backgroundColor: "rgba(0, 0, 0, 0.0470588)"}}>
                <p style={{lineHeight: "1em"}}>Borrowed  <span style={label}>{borrowedTotal || 0}</span></p>
                </a>
                <a className="item" style={{backgroundColor: "rgba(0, 0, 0, 0.0470588)"}}>
                <p style={{lineHeight: "1em"}}>Messages  <span style={label}>{lendedTotal || 0}</span></p>
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
