import axios from 'axios';
import List from './list';
import queryString from 'query-string';
import React from 'react';
import { Button, Card, Divider, Icon, Image, Item  } from 'semantic-ui-react';
import SideBarItems from '../sidebar/sidebaritems'

export default class DisplayList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }


    render() {

        // console.log(this.props.query);
    //     var query = this.props.params.query || null;
    //     let collection = query.collection;
    //     let genre = query.genre;
    //     var userCollection = _.sortBy(this.props.userData.items, function(item) {return item.dateadded}).reverse();
    //     if (!_.isEmpty(query)) {
    //         if (genre && collection) {
    //             var groupByCollection = _.filter(userCollection, (item) => {
    //                 return item.collection == collection && item.genre == genre
    //             });
    //
    //             if (this.props.view == "grid") {
    //             var list = (
    //                     <Item>
    //                         <ul style={{margin: "0", padding: "0"}}>
    //                             <h1>{collection.toUpperCase()} > {genre.toUpperCase()}</h1>
    //                             <List child={groupByCollection} view={this.props.view}/>
    //                         </ul>
    //                     </Item>)
    //                 } else {
    //             var list = (
    //                 <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
    //
    //                         <h1>{collection.toUpperCase()}</h1>
    //                         <List child={groupByCollection} view={this.props.view}/>
    //                     </div>
    //                     )
    //                 }
    //         } else if (collection) {
    //         var groupByCollection = _.filter(userCollection, (item) => {
    //             return item.collection == collection
    //         });
    //         if (this.props.view == "grid") {
    //             var list = (
    //                     <Item>
    //                         <ul style={{margin: "0", padding: "0"}}>
    //                             <h1>{collection.toUpperCase()}</h1>
    //                             <List child={groupByCollection} view={this.props.view}/>
    //                         </ul>
    //                     </Item>)
    //                 } else {
    //             var list = (
    //                 <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
    //                         <h1>{collection.toUpperCase()}</h1>
    //                         <List child={groupByCollection} view={this.props.view}/>
    //                     </div>
    //                     )
    //                 }
    //     }
    // } else {
    //         var groupByCollection = _.groupBy(userCollection, "collection");
    //         if (this.props.view == "grid") {
    //         var list = _.keys(groupByCollection).map((item) => {
    //             return (
    //                 <Item>
    //                     <ul style={{margin: "0", padding: "0"}}>
    //                         <h1>{item.toUpperCase()}</h1>
    //                         <List child={groupByCollection[item]} view={this.props.view}/>
    //                     </ul>
    //                 </Item>
    //                 )
    //             })
    //         } else {
    //             var list = _.keys(groupByCollection).map((item) => {
    //                 return (
    //                     <div className="ui raised very padded container segment" style={{marginTop: "50px", maxWidth:"1000px!important"}}>
    //                         <h1>{item.toUpperCase()}</h1>
    //                         <List child={groupByCollection[item]} view={this.props.view} style={{display: 'inline-flex',
    //             flexWrap: 'nowrap'}}/>
    //                         <br/>
    //                     </div>
    //
    //             )
    //         })
    //     }
    // }

    return(
            <div style={content}>
                Hello
            </div>
        )
    }
    }
// }
// <div style={{position: "relative", width: "90%"}}>
//     <div>
//         {
//             (this.props.view == "grid") ? (
//                 <div className="ui raised very padded text container segment" style={{marginTop: "50px"}}>
//                     <Item.Group>
//                         {list}
//                     </Item.Group>
//                 </div>
//             ) : (
//                 <div style={{margin: "14px 0"}}>
//                     {list}
//                 </div>
//             )
//         }
//     </div>

const content = {
    height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
