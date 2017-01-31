import React from 'react';
import { Button, Card, Icon, Image, Image as ImageComponent, Item, Label, Divider } from 'semantic-ui-react'



export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.view == "grid") {
        var nestedList = _.map(this.props.child, (item) => {
            return (
                <Item>
                <Item.Image size="tiny" src={item.imgUrl} />
                    <Item.Content>
                        <Item.Header>{item.name}</Item.Header>
                        <Item.Meta>
                            { item.artist ? (
                            <span className='artist'>{item.artist} > </span>)
                            : ""}
                            <span className='price'>US$ {item.acquisition_price} > </span>
                            <span className='stay'>Acquisition on: {item.acquisition_date}</span>
                        </Item.Meta>
                        <Item.Description>{item.genre} > {item.platform} {item.media} {item.pages}</Item.Description>
                    </Item.Content>
                 <Divider fitted style={{minWidth: "615px"}}/>
                </Item>
            )
        })
    } else {
        var nestedList = _.map(this.props.child, (item) => {
            return (
                <Card style={{margin: "10px", width: "250px"}}>
                    <Image src={item.imgUrl}/>
                    <Card.Content>
                        <Card.Header>{item.name}</Card.Header>
                        <Card.Meta>US$ {item.acquisition_price} > Acquisition on: {item.acquisition_date}</Card.Meta>
                        <Card.Description>{item.genre} > {item.platform} {item.media} {item.pages}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a><Icon name='user' />10 Friends</a>
                    </Card.Content>
                </Card>
            )
        })
    }
        return(
            <div style={{overflow: "auto"}}>
            {
                (this.props.view == "grid") ?
                (
                <div className="ui list">
                    {nestedList}
                </div>
            ) : (
                <div style={{display: 'inline-flex',
                    flexWrap: 'nowrap'}}>
                    {nestedList}
                </div>
            )
            }
            </div>
        )
    }
}
