import { Link } from 'react-router';
import React from 'react';
import { Divider } from 'semantic-ui-react';
import queryString from 'query-string';

export default class AddMoreNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showItems: false,
            query: this.props.query
        }
    }

    onHover() {
    }

    clickHandler() {
        this.setState({
            showItems: !this.state.showItems
        })

    }

    render () {

        return (

                <li onClick={() => this.clickHandler()} style={{padding: "10px 10px 10px 20px", listStyle: "none", cursor: "pointer"}}>ADD MORE STUFF
                { this.state.showItems ? <i className="caret up icon"></i> : <i className="caret down icon"></i> }
                    { this.state.showItems ? (
                    <div>
                        <div>
                            <Link to="/addmorestuff/Books"><h5 style={liStyle}><i className="add circle icon"></i> Add a book</h5></Link>
                            <Link to="/addmorestuff/Games"><h5 style={liStyle}><i className="add circle icon"></i> Add a games</h5></Link>
                            <Link to="/addmorestuff/Movies"><h5 style={liStyle}><i className="add circle icon"></i> Add a movie</h5></Link>
                            <Link to="/addmorestuff/Music"><h5 style={liStyle}><i className="add circle icon"></i> Add an album</h5></Link>
                        </div>
                    </div>
                    ) : null
                }
                </li>
        )
    }

}

const liStyle = {
    margin: "10px 0px 0px 0px",
    color:"rgba(255,255,255,.5)",
    fontWeigth:"normal"
}
