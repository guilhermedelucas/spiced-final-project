import axios from 'axios';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import { Item, Divider, Label } from 'semantic-ui-react';
import { Link } from 'react-router';
import AddMoreNavBar  from '../navbar/addmorenav'


var linksList = {
    listStyle: "none",
    color: "rgba(255,255,255,.5)",
    padding: "10px 0 10px 10px",
};

export default class SideBarItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbar: [],
            nestedView: this.props.nestedView

        }
    }

    componentDidMount() {
        axios.get('/getnavbar').then((response) => {
            this.setState({
                navbar: response.data.navbar,
            })

        });
    }

    dropdown(e){
        if ($(".hide" + e).css("display") == "none") {
            $(".hide" + e).css("display", "block");
            $(".top" + e).css("color", "white");
        } else {
            $(".hide" + e).css("display", "none");
            $(".top" + e).css("color", "rgba(255,255,255,.5)");
        }
    }

    render() {
        var nestedObject = {};
        var nestedView = this.state.nestedView;
        var query = this.props.query;
        let collection = query.collection;
        var list = _.map(this.state.navbar, (item) => {
            return (
                <div>
                    <Link to={'/results?collection=' + item._id}>
                        <h5 style={linksList} className={ "top" + item._id } value={item._id} onClick={() => this.dropdown(item._id)}>{item._id}
                            { $(".hide" + item._id).css("display") == "block" ? <i className="caret up icon"></i> : <i className="caret down icon"></i>}
                        </h5>
                    </Link>
                    <ul style={{paddingLeft: "20px", display: "none", marginTop: "0px"}} className={ "hide" + item._id}>
                        { item.genre.length ? <a className="item" style={{margin: "10px 0px 0px 0px", color:"rgba(255,255,255,.5)"}}>Genres </a> : null}
                            {_.map(item.genre, (element) => {
                                return (
                                    <Link to={'/results/?collection=' + item._id + '&genre=' + element}>
                                        <li style={{marginLeft: "10px", listStyle: "none", color: "rgba(255,255,255,.5)"}}>{element}</li>
                                    </Link>
                                )
                            })}
                        { item.platform.length ? <h5 style={{margin: "10px 0px 0px 0px", color:"rgba(255,255,255,.5)"}}>Consoles / Platforms</h5> : null}
                        {_.map(item.platform, (element) => {
                            return (
                                <Link to={'/results/?collection=' + item._id + '&platform=' + element}>
                                    <li style={{marginLeft: "10px", listStyle: "none", color: "rgba(255,255,255,.5)"}}>{element}</li>
                                </Link>)
                        })}
                        { item.media.length ? <h5 style={{margin: "10px 0px 0px 0px", color:"rgba(255,255,255,.5)"}}>Media type</h5> : null}
                        {_.map(item.media, (element) => {
                            return (
                                <Link to={'/results/?collection=' + item._id + '&media=' + element}>
                                    <li style={{marginLeft: "10px", listStyle: "none", color: "rgba(255,255,255,.5)"}}>{element}</li>
                                </Link>)
                        })}
                    </ul>
                    <Divider style={{margin: "5px 0px"}}/>
                </div>
            )
        })


        // var list = _.map(this.state.navbar, (item) => {
        //     if (collection === item._id) {
        //         return (
        //             <div>
        //                 <Link to={'/results?collection=' + item._id} onClick={this.dropdown.bind(this)}>
        //                     <h5 style={linksList}  value={'#collection=' + item._id}>{item._id}
        //                         {nestedView == "block" ? <i className="caret up icon"></i> : <i className="caret down icon"></i>}
        //                     </h5>
        //                 </Link>
        //                     <ul style={{paddingLeft: "20px", display: nestedView}}>
        //                     { item.genre.length ? <h5 style={{margin: "10px 0px 0px 0px", display: nestedView}}>Genres</h5> : null}
        //                         {_.map(item.genre, (element) => {
        //                             return (
        //                                 <Link to={'/results/?collection=' + item._id + '&genre=' + element}>
        //                                     <li style={{marginLeft: "10px", listStyle: "none", display: nestedView, color: "white"}}>{element}</li>
        //                                 </Link>
        //                             )
        //                         })}
        //                     { item.platform.length ? <h5 style={{margin: "10px 0px 0px 0px", display: nestedView}}>Consoles / Platforms</h5> : null}
        //                     {_.map(item.platform, (element) => {
        //                         return (
        //                             <Link to={'/results/?collection=' + item._id + '&platform=' + element}>
        //                                 <li style={{marginLeft: "10px", listStyle: "none", display: nestedView, color: "white"}}>{element}</li>
        //                             </Link>)
        //                     })}
        //                     { item.media.length ? <h5 style={{margin: "10px 0px 0px 0px", display: nestedView}}>Media type</h5> : null}
        //                     {_.map(item.media, (element) => {
        //                         return (
        //                             <Link to={'/results/?collection=' + item._id + '&media=' + element}>
        //                                 <li style={{marginLeft: "10px", listStyle: "none", display: nestedView, color: "white"}}>{element}</li>
        //                             </Link>)
        //                     })}
        //                     </ul>
        //                     <Divider style={{margin: "5px 0px"}}/>
        //                 </div>
        //             )
        //     } else {
        //         return (
        //                 <Link to={'/results?collection=' + item._id} onClick={this.dropdown.bind(this)}>
        //                     <h5 style={{listStyle: "none", color:"white", padding:"10px 0", margin:"0", padding:"10px 0 10px 10px"}}  value={'/results?collection=' + item._id}>{item._id}<i className="caret down icon"></i></h5>
        //                     <Divider style={{margin: "5px 0px"}}/>
        //                 </Link>
        //             )
        //         }
        //     })

        return(
            <div>
                <AddMoreNavBar/>
                <Link to="/">
                    <li style={{padding: "10px", listStyle: "none", color:"white"}}>ALL MY STUFF</li>
                </Link>
                <Divider style={{margin: "5px 0px"}}/>
                {list}
            </div>
        )
    }
}
