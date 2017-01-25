import axios from 'axios';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import { Item, Divider } from 'semantic-ui-react';
import { Link } from 'react-router';



export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    clickHandler(item) {
        this.props.handler('#collection=' + item);
    }

    render() {
        var groupByCollection = _.groupBy(this.props.userData.items, "collection");
        var list = _.keys(groupByCollection).map((item) => {
            return (
                        <Link to={'#collection=' + item}>
                            <li style={{padding: "10px", listStyle: "none"}} onClick={() => this.clickHandler(item)} value={'#collection=' + item}>{item.toUpperCase()}</li>
                        </Link>
                )
            })

        return(
            <ul style={{display: "inline-flex"}}>
                <Link to="/">
                    <li style={{padding: "10px", listStyle: "none"}} onClick={() => this.clickHandler("")}>ALL MY STUFF</li>
                </Link>
                {list}
            </ul>
        )
    }
}
