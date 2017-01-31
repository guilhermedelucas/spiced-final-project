import { Link } from 'react-router';
import React from 'react';
import { Divider } from 'semantic-ui-react';
import queryString from 'query-string';




var dropdown = {
    position: "relative",
}

var dropdownContent = {
    display: "block",
    position: "absolute",
    backgroundColor: "#f9f9f9",
    minWidth: "200px",
    boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)",
    zIndex: 1
}

var dropdownItem = {
    display: "block",
    padding: "12px 16px"

}

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

    changeForm(){
        // const query = queryString.parse(e);
        // this.setState({
        //     query: query.query
        // })
    }

    render () {

        return (

                <li onClick={() => this.clickHandler()} style={{padding: "10px", listStyle: "none", cursor: "pointer"}}>ADD MORE STUFF
                { this.state.showItems ? <i className="caret up icon"></i> : <i className="caret down icon"></i> }

                { this.state.showItems ? (
                    <div style={dropdown}>
                        <div style={dropdownContent}>
                            <Link to="/addmorestuff/addbook" style={dropdownItem} onClick={() => this.changeForm()}><i className="add circle icon"></i>Add a book</Link>
                            <Link to="/addmorestuff/addgames" style={dropdownItem} onClick={() => this.changeForm()}><i className="add circle icon"></i>Add a games</Link>
                            <Link to="/addmorestuff/addmovies" style={dropdownItem} onClick={() => this.changeForm()}><i className="add circle icon"></i>Add a movie</Link>
                            <Link to="/addmorestuff/addmusic" style={dropdownItem} onClick={() => this.changeForm()}><i className="add circle icon"></i>Add an album</Link>
                        </div>
                    </div>
                    ) : null
                }
                </li>

        )
    }

}
