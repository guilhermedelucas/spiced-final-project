import axios from 'axios';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import { Item, Divider } from 'semantic-ui-react';
import { Link } from 'react-router';
import AddMoreNav from './addmorenav'



export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar: [],
            nestedView: "block"
        }
    }

    componentDidMount() {
        axios.get('/getnavbar').then((response) => {
            this.setState({
                navbar: response.data.navbar,
            })
        });
    }

    componentWillMount(){
        this.setState({
            nestedView: "block"
        })
    }

    dropdown(){
        if (this.state.nestedView == "block") {
            this.setState({
                nestedView: "none"
            })
        } else {
            this.setState({
                nestedView: "block"
            })
        }
    }


    render() {
        var query = this.props.query;
        let collection = query.collection;
        var list = _.map(this.state.navbar, (item) => {
            if (item._id == collection) {
            return (    <div>
                        <Link to={'/results?collection=' + item._id}>
                            <li style={{padding: "10px", listStyle: "none", fontWeight: "bold"}}  value={'#collection=' + item._id} onClick={this.dropdown.bind(this)}>{item._id.toUpperCase()}</li>
                        </Link>
                            <ul style={{paddingLeft: "20px", display: this.state.nestedView }}>
                            { item.genre.length ? <h4 style={{margin: "10px 0px 0px 0px", display: this.state.viewNested}}>Genres</h4> : null}
                            {_.map(item.genre, (element) => {
                                return (<Link to={'/results/?collection=' + item._id + '&genre=' + element}><li style={{marginLeft: "10px", listStyle: "none", display: this.state.viewNested}}>{element}</li></Link>)
                            })}
                            { item.platform.length ? <h4 style={{margin: "10px 0px 0px 0px", display: this.state.viewNested}}>Consoles / Platforms</h4> : null}
                            {_.map(item.platform, (element) => {
                                return (<Link to={'/results/?collection=' + item._id + '&platform=' + element}><li style={{marginLeft: "10px", listStyle: "none", display: this.state.viewNested}}>{element}</li></Link>)
                            })}
                            { item.media.length ? <h4 style={{margin: "10px 0px 0px 0px", display: this.state.viewNested}}>Media type</h4> : null}
                            {_.map(item.media, (element) => {
                                return (<Link to={'/results/?collection=' + item._id + '&media=' + element}><li style={{marginLeft: "10px", listStyle: "none", display: this.state.viewNested}}>{element}</li></Link>)
                            })}
                            </ul>
                        </div>
                )
            } else {
            return (
                        <Link to={'/results?collection=' + item._id}>
                            <li style={{padding: "10px", listStyle: "none"}}  value={'/results?collection=' + item._id}>{item._id.toUpperCase()}</li>
                        </Link>
                    )
                }
            })

        return(
            <div style={{height: "67px"}}>
                <div style={{float: "left"}}>
                    <ul style={{display: "inline-flex"}}>
                        <Link to="/">
                            <li style={{padding: "10px", listStyle: "none"}}>ALL MY STUFF</li>
                        </Link>
                        {list}
                    </ul>
                </div>
                <div style={{float: "right"}}>
                    <ul style={{display: "inline-flex"}}>
                        <AddMoreNav query={this.props.query}/>
                        <Link to="/"><li style={{padding: "10px", listStyle: "none"}}>PROFILE</li></Link>
                    </ul>
                </div>
            </div>
        )
    }
}
