import React from 'react';
import { Link } from 'react-router';
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
                        <Link to={"/sgit/" + item._id}><Item.Header>{item.name}</Item.Header></Link>
                        <Item.Meta>
                            { item.artist ? (
                                <span className='artist'><Label color='red' horizontal>Artist:</Label> <Link to={"/results/artist=" + item.artist}>{item.artist}</Link></span>) : null }
                            { item.author ? (
                                <span className='author'><Label color='red' horizontal>Author:</Label> <Link to={"/results/author=" + item.author}>{item.author}  </Link><Label color='red' horizontal>Publisher:</Label> {item.publisher || "Not informed"}</span>) : null}
                            { item.director ? (<span className='director'><Label color='red' horizontal>Director:</Label> {item.director}  <Label color='red' horizontal>Actors:</Label> {item.actors  || "Not informed"}</span>) : null}
                        </Item.Meta>
                        <Item.Description><Link to={'/results/collection=' + item.collection + "&genre=" + item.genre}>{item.genre}</Link> > <Link to ={"/results/platform=" + item.platform}>{item.platform} </Link> <Link to={'/results/collection=' + item.collection + '&media=' + item.media}>{item.media} </Link> {item.pages}</Item.Description>
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
                        <Link to={"/sgit/" + item._id}><Card.Header>{item.name}</Card.Header></Link>
                        { item.artist ? <Card.Meta>Artist: <Link to={"/results/artist=" + item.artist}>{item.artist}</Link></Card.Meta> : null }
                        { item.author ? <Card.Meta>Author(s): <Link to={"/restuts/author=" + item.author}>{item.author}</Link>, Publisher: {item.publisher}</Card.Meta> : null}
                        { item.director ? <Card.Meta>Director: {item.director}, Actors: {item.actors}</Card.Meta> : null}
                        <Card.Description><Link to={'/results/collection=' + item.collection + "&genre=" + item.genre}>{item.genre}</Link> > <Link to ={"/results/platform=" + item.platform}>{item.platform}</Link> <Link to={'/results/collection=' + item.collection + '&media=' +  item.media}>{item.media}</Link> {item.pages}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a><Icon name='user' />0 Likes</a>
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
