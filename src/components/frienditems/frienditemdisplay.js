import axios from 'axios';
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Button, Card, Divider, Icon, Image, Item, Label  } from 'semantic-ui-react';
import FriendItemNavbar from './frienditemnavbar';


export default class FriendItemsDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collection: "Books",
            index: 0,
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

    onChangeView(name) {
        console.log(name);
        this.setState({
            collection: name,
            index: 0
        })
    }

    paginateControl(controller) {
        const { index } = this.state;
        controller == "more" ? this.setState({
            index: (index + 6)
        }) : this.setState({
            index: (index - 6)
        })
    }

    render(){
        const { collection, userItems, index } = this.state;

        var arrayOfItems = _.filter(userItems, function(item){
            return item.collection == collection

        })


        var displayList = _.map(arrayOfItems.slice(index, index + 6), (item) => {
            return (
                <Item>
                <Item.Image size="tiny" src={item.imgUrl} style={{maxHeight: "80px", margin: "auto", marginBottom: "8px"}}/>
                    <Item.Content style={{verticalAlign: "middle"}}>
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
                    <Divider fitted style={{minWidth: "615px", marginTop: "6px"}}/>
                    </Item>
            )
        })


        return(
            <div>
                <FriendItemNavbar callbackParent={this.onChangeView.bind(this)}/>
                <div className="ui list">
                    { displayList }
                </div>
                { index >= 6 ? <Button.Group floated="left"><Button onClick={() => this.paginateControl("back")}>Back</Button></Button.Group>  : null} { arrayOfItems.length > 6 && arrayOfItems.length > index + 6 ? <Button.Group floated="right"><Button onClick={() => this.paginateControl("more")}>More</Button></Button.Group> : null }
            </div>
        )
    }
}

const imageStyleHover = {
    width: "200px",height: "200px", borderRadius: "50%", backgroundColor: "white", margin:"auto", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)", marginTop: "-56px", border:"10px solid white"
};
