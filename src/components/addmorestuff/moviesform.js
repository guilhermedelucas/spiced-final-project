import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
var Router = require('react-router');
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

export default class MoviesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            uploadSuccess: false
        };
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
        let { name, genre, media, director, actors, file, borrow} = this.state
        var formData = new FormData();
        formData.append('file', file);
        axios.post('/insertdata/saveimage', formData, {
            headers: {
                'Content-Type': false
            }
        }).then((response) => {
            console.log(response);
            if (response.data.success) {
                axios.post('/insertdata/addmovie', {name, genre, media, director, actors, imgUrl: response.data.file, collection: this.props.query}, borrow).
                then((response) => {
                    if (response.data.success) {
                        this.setState({
                            uploadSuccess: true
                        })
                        setTimeout(() => {Router.browserHistory.push('/results/collection=Movies')}, 1000);
                    }
                    console.log("worked");
                })
            } else {
                console.log("didin't worked");
            }
        });
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{borderRadius: "15px", width: "100%"}}/>);
        } else {
            $imagePreview = (<div className="previewText" style={{color: "rgb(102, 102, 102)", fontWeigth: "bold"}}>Please select an Image for Preview</div>);
        }
        return (
            <div className="ui raised very padded text container segment" style={{marginTop: "50px", overflow: "auto"}}>
            <h2>{this.props.title}</h2>
                <h4>Title</h4>
                <input label='Title' onChange={this.handleChange.bind(this)} style={inputStyle} name='name' placeholder='Insert the title' value={this.state.name}/>
                <div className="imgPreview" style={{width: "100%", paddingTop: "35px"}}>
                    {$imagePreview}
                </div>
                <h4>Image</h4>
                <input className="fileInput" type="file" onChange={(e) => this.handleImageChange(e)} />
                <h4>Genre</h4>
                    <select className="ui fluid dropdown" name="genre" style={inputStyle} onChange={this.handleChange.bind(this)} value={this.state.genre}>
                        {_.map(moviesGenres, (item) => {
                            return (
                            <option value={item}>{item}</option>
                            )}
                        )}
                    </select>
                <div style={{display: "inline-flex", width: "100%"}}>
                    <div style={{paddingTop: "24px", paddingRight: "30px", flexGrow: "1"}}>
                        <h4>Media</h4>
                            <select className="ui fluid dropdown" name="media" style={inputStyle} onChange={this.handleChange.bind(this)} value={this.state.media}>
                                    <option value="">Select the media of your movie</option>
                                    <option value="Blu-ray">Blu-ray</option>
                                    <option value="DVD">DVD</option>
                                    <option value="VHS">VHS</option>
                            </select>
                    </div>
                    <div style={{paddingTop: "24px", paddingRight: "30px", flexGrow: "2"}}>
                        <h4>Actors</h4>
                        <input label='developer' style={inputStyle} onChange={this.handleChange.bind(this)} name='actors' placeholder='Inform the main Actors' value={this.state.actors}/>
                    </div>
                </div>
                <div style={{display: "inline-flex", width: "100%"}}>
                    <div style={{paddingTop: "24px", paddingRight: "30px", flexGrow: "2"}}>
                        <h4>Director</h4>
                        <input label='Pages' style={inputStyle} onChange={this.handleChange.bind(this)} name='director' placeholder='Inform the Director' value={this.state.director}/>
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
        )
    }
}

const moviesGenres = [
    "Select the genre", "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sports", "Thriller", "War", "Western" ]

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
