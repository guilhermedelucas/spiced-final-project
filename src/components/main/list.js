import React from 'react';
import { Button, Icon, Image as ImageComponent, Item, Label, Divider } from 'semantic-ui-react'



export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var nestedList = _.map(this.props.child, (item) => {
            return (
                <Item>
                <Item.Image size="tiny" src={item.imgUrl} />
                    <Item.Content style={{width: "600px"}}>
                        <Item.Header>{item.name}</Item.Header>
                        <Item.Meta>
                            <span className='price'>U$ {item.acquisition_price}</span>
                            <span className='stay'>Acquisition on: {item.acquisition_date}</span>
                        </Item.Meta>
                        <Item.Description>{item.genre} > {item.platform} {item.media} {item.pages}</Item.Description>
                    </Item.Content>
                 <Divider fitted />
                </Item>
        )
    })
        return(
            <div className="ui list">{nestedList}</div>
        )
    }
}
