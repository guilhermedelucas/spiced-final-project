import axios from 'axios';
import List from './list';
import queryString from 'query-string';
import React from 'react';
import ReactDOM from 'react-dom';
import { Item, Divider } from 'semantic-ui-react';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';



export default class DisplayList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let query = queryString.parse(this.props.query);
        if (!_.isEmpty(query)) {
            let genre = query.genre;
            let collection = query.collection;
            if (genre && collection) {
                console.log("there is genre");
                var groupByCollection = _.filter(this.props.userData.items, (item) => {
                    return item.collection == collection && item.genre == genre
                });
                var list = (
                        <Item>
                            <ul>
                                <h1>{collection.toUpperCase()}</h1>
                                <List child={groupByCollection} />
                            </ul>
                        </Item>)
            } else if (collection) {
            var groupByCollection = _.filter(this.props.userData.items, (item) => {
                return item.collection == collection
            });
            var list = (
                    <Item>
                        <ul>
                            <h1>{collection.toUpperCase()}</h1>
                            <List child={groupByCollection} />
                        </ul>
                    </Item>)
                }
        } else {
            var groupByCollection = _.groupBy(this.props.userData.items, "collection");
            var list = _.keys(groupByCollection).map((item) => {
                return (
                    <Item>
                        <ul>
                            <h1>{item.toUpperCase()}</h1>
                            <List child={groupByCollection[item]} />
                        </ul>
                    </Item>
                    )
                })
        }
        return(
            <Item.Group>
                {list}
            </Item.Group>
        )
    }
}





// import React from 'react'
// import { Card, Icon, Image } from 'semantic-ui-react'
//
// const CardExampleImageCard = () => (
//   <div style={{display: "inline-flex"}}>
//   <Card style={{width: "200px", margin: "10px"}}>
//     <Image src='http://semantic-ui.com/images/avatar/large/daniel.jpg' />
//     <Card.Content>
//       <Card.Header>Daniel</Card.Header>
//       <Card.Meta>Joined in 2016</Card.Meta>
//       <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <a>
//         <Icon name='user' />
//         10 Friends
//       </a>
//     </Card.Content>
//   </Card>
//     <Card>
//     <Image src='http://semantic-ui.com/images/avatar/large/daniel.jpg' />
//     <Card.Content>
//       <Card.Header>Daniel</Card.Header>
//       <Card.Meta>Joined in 2016</Card.Meta>
//       <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <a>
//         <Icon name='user' />
//         10 Friends
//       </a>
//     </Card.Content>
//   </Card>
//     <Card>
//     <Image src='http://semantic-ui.com/images/avatar/large/daniel.jpg' />
//     <Card.Content>
//       <Card.Header>Daniel</Card.Header>
//       <Card.Meta>Joined in 2016</Card.Meta>
//       <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <a>
//         <Icon name='user' />
//         10 Friends
//       </a>
//     </Card.Content>
//   </Card>
//     <Card>
//     <Image src='http://semantic-ui.com/images/avatar/large/daniel.jpg' />
//     <Card.Content>
//       <Card.Header>Daniel</Card.Header>
//       <Card.Meta>Joined in 2016</Card.Meta>
//       <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <a>
//         <Icon name='user' />
//         10 Friends
//       </a>
//     </Card.Content>
//   </Card>
//   </div>
// )
//
// export default CardExampleImageCard
