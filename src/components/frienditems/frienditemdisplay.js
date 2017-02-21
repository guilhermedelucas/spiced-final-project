import axios from 'axios';
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Button, Card, Divider, Icon, Image, Item, Label  } from 'semantic-ui-react';

export default class FriendItemsDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        const { currentFriend } = this.props;
        axios.get('/getdata/frienditems/' + currentFriend).then((response) => {
                const userItems = response.data.userItems[0].items;
                console.log(userItems);
                this.setState({
                    userItems
                })
        });
    }

    onChangeView() {



    }

    render(){

            var displayList = _.map(this.state.userItems, function(item){
                return (
                    <Item>
                    <Item.Image size="tiny" src={item.imgUrl} />
                        <Item.Content>
                            <Link to={"/sgit/" + item._id}><Item.Header>{item.name}</Item.Header></Link>
                            <Item.Meta>
                                { item.artist ? (
                                    <span className='artist'><Label color='red' horizontal>Artist:</Label> <Link to={"/results/artist=" + item.artist}>{item.artist}</Link></span>) : null }
                                { item.author ? (
                                    <span className='author'><Label color='red' horizontal>Author:</Label> <Link to={"/results/author=" + item.author}>{item.author}  </Link><Label color='red' horizontal>Publisher:</Label> {item.publisher}</span>) : null}
                                { item.director ? (<span className='director'><Label color='red' horizontal>Director:</Label> {item.director}  <Label color='red' horizontal>Actors:</Label> {item.actors}</span>) : null}
                            </Item.Meta>
                            <Item.Description><Link to={'/results/collection=' + item.collection + "&genre=" + item.genre}>{item.genre}</Link> > <Link to ={"/results/platform=" + item.platform}>{item.platform} </Link> <Link to={'/results/collection=' + item.collection + '&media=' + item.media}>{item.media} </Link> {item.pages}</Item.Description>
                        </Item.Content>
                        <Divider fitted style={{minWidth: "615px"}}/>
                        </Item>
                )
            })


        return(
            <div className="ui list">
                { displayList }
            </div>
        )
    }
}

const imageStyleHover = {
    width: "200px",height: "200px", borderRadius: "50%", backgroundColor: "white", margin:"auto", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)", marginTop: "-56px", border:"10px solid white"
};
