import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
var Router = require('react-router');
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

export default class DisplayItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log("will mount");
        axios.get('/getdata/singleitem/' + this.props.query).then((response) => {
            console.log(response);
            this.setState({
                name: response.data.itemData[0].item.name,
                genre: response.data.itemData[0].item.genre,
                publisher: response.data.itemData[0].item.publisher,
                artist: response.data.itemData[0].item.artist,
                media: response.data.itemData[0].item.media,
                platform: response.data.itemData[0].item.platform,
                developer: response.data.itemData[0].item.developer,
                pages: response.data.itemData[0].item.pages,
                author: response.data.itemData[0].item.author,
                borrow: response.data.itemData[0].item.borrow,
                imagePreviewUrl: response.data.itemData[0].item.imgUrl,
                collection: response.data.itemData[0].item.collection
                })
                console.log(this.state);
            })
    }

    handleCollection(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(){
        // console.log(this.props);
        // let { name, genre, publisher, pages, author, file, borrow} = this.state
        // var formData = new FormData();
        // formData.append('file', file);
        // axios.post('/insertdata/saveimage', formData, {
        //     headers: {
        //         'Content-Type': false
        //     }
        // }).then((response) => {
        //     console.log(response);
        //     if (response.data.success) {
        //         axios.post('/insertdata/addbook', {name, genre, publisher, pages, author, imgUrl: response.data.file, collection: this.props.query, borrow}).
        //         then((response) => {
        //             if (response.data.success) {
        //                 this.setState({
        //                     uploadSuccess: true
        //                 })
        //                 setTimeout(() => {Router.browserHistory.push('/results?collection=Books')}, 1000);
        //             }
        //             console.log("worked");
        //         })
        //     } else {
        //         console.log("didin't worked");
        //     }
        // });
    }

    render() {
        let $imagePreview = null;
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<img src={this.state.imagePreviewUrl} style={{borderRadius: "15px", maxHeight: "300px"}}/>);
        } else {
            $imagePreview = (<div className="previewText" style={{color: "rgb(102, 102, 102)", fontWeigth: "bold"}}>Please select an Image for Preview</div>);
        }
        return (
            <div style={content}>
                <div className="ui raised very padded text container segment" style={{marginTop: "50px"}}>
                <h2>{this.state.name}</h2>
                <input label='Title' onChange={this.handleChange.bind(this)} style={inputStyle} name='name' placeholder='Insert the title' value={this.state.name}/>
                <div className="imgPreview" style={{width: "100%", paddingTop: "35px", textAlign: "center"}}>
                    {$imagePreview}
                </div>
                <h4>Change or insert image</h4>
                <input className="fileInput" type="file" onChange={(e) => this.handleImageChange(e)} />
                <h4>Genre</h4>
                    <select className="ui fluid dropdown" name="genre" style={inputStyle} onChange={this.handleChange.bind(this)} value={this.state.genre}>
                        {_.map(booksGenres, (item) => {
                            return (
                            <option value={item}>{item}</option>
                            )}
                        )}
                    </select>
                <h4>Publisher</h4>
                <input label='Publisher' style={inputStyle} onChange={this.handleChange.bind(this)} name='publisher' placeholder='Inform the Publisher' value={this.state.publisher}/>
                <h4>Author</h4>
                <input label='Publisher' style={inputStyle} onChange={this.handleChange.bind(this)} name='author' placeholder='Author(s) name' value={this.state.author}/>
                <div style={{display: "inline-flex", width: "100%"}}>
                    <div style={{paddingTop: "24px", paddingRight: "30px", flexGrow: "1"}}>
                        <h4>Number of Pages</h4>
                        <input label='Pages' style={inputStyle} onChange={this.handleChange.bind(this)} name='pages' placeholder='Number of pages' value={this.state.pages}/>
                    </div>
                    <div style={{paddingTop: "24px", flexGrow: "1"}}>
                        <h4>Item is available to borrow?</h4>
                        <select name="borrow" className="ui fluid dropdown" style={inputStyle3Collums} onChange={this.handleChange.bind(this)} value={this.state.borrow}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
                <Button style={{margin: "25px 0px 0px 0px", width: "100%", height: "46px"}} onClick={() => {this.handleSubmit()}}>Submit</Button>
                {   this.state.uploadSuccess ?
                    <div className="ui success message">
                        <div class="header">Submit Completed</div>
                        <p>Click on any input to clear the data.</p>
                    </div> : null
                }
                </div>
            </div>

        )
    }
}

const booksGenres = [
    "Select the genre", "Science fiction", "Satire", "Drama", "Action and Adventure", "Romance", "Mystery", "Horror", "Self help", "Health", "Guide", "Travel", "Children's", "Religion", "Spirituality & New Age", "Science", "History", "Math", "Anthology", "Poetry", "Encyclopedia", "Dictionaries", "Comics", "Art", "Cookbooks", "Diaries", "Journals", "Series", "Trilogy", "Biography", "Autobiography", "Fantasy", "IT", "Technology", "Language Studies"]

const inputStyle = {
    padding:" 0.67861429em 1em",
    fontSize: "1em",
    background: "#fafafa",
    border: "1px solid #cccccc",
    color: "rgba(0, 0, 0, 0.87)",
    borderRadius: "3px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.075) inset",
    transition: "color 0.1s ease, border-color 0.1s ease",
    width: "100%"
}

const inputStyle3Collums = {
    display: "flex",
    padding:" 0.67861429em 1em",
    fontSize: "1em",
    background: "#fafafa",
    border: "1px solid #cccccc",
    color: "rgba(0, 0, 0, 0.87)",
    borderRadius: "3px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.075) inset",
    transition: "color 0.1s ease, border-color 0.1s ease",
    width: "100%"
}

const content = {
    height: "100vh",  width: "100vw", position: "relative", backgroundImage:"url(../../imgs/background.jpg)", backgroundSize: "cover", overflow: "auto", zIndex: "1", boxShadow: "0px 5px 24px 0px rgba(0,0,0,0.1)"
}
