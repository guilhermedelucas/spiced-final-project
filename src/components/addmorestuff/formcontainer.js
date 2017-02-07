import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

const collection = [
  { key: 'Books', text: 'Books', value: 'Books' },
  { key: 'Games', text: 'Games', value: 'Games' },
  { key: 'Music', text: 'Music', value: 'Music' },
  { key: 'Movies', text: 'Movies', value: 'Movies' },
]

//gonna split the fomscontainers in differents, activated by the query//

export default class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            value: {},
            genre: "",
            pages: "",
            publisher: "",
            acquisition_date: "",
            acquisition_price: "",
            borrow: ""
        }
    }

    handleCollection(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(e.target.value);
        this.setState({
            [name]: value
        });

    }

    handleSubmit(e, { formData }){
      e.preventDefault();
      console.log(this.state);
    //   this.setState({ formData })
    }

    render() {
        console.log(this.props.query);
        var form;
        switch(this.state.value) {
            case "Books":
                var forms = (
                    <div>
                        <h3>Genre</h3>
                        <input label='Genre' onChange={this.handleChange.bind(this)} name='genre' placeholder='Insert the genre' value={this.state.genre}/>
                        <h3>Publisher</h3>
                        <input label='Publisher' onChange={this.handleChange.bind(this)} name='publisher' placeholder='Inform the Publisher'/>
                        <h3>Number of Pages</h3>
                        <input label='Pages' onChange={this.handleChange.bind(this)} name='pages' placeholder='Number of pages' value={this.state.pages}/>
                        <h3>Acquisition Date</h3>
                        <input label='AcquisitionDate' onChange={this.handleChange.bind(this)} name='AcquisitonDate' placeholder='Inform the Acquisiton Date, format DD:MM:YYYY' value={this.state.acquisition_date}/>
                        <h3>Acquisition Price</h3>
                        <input label='AcquisitionPrice' onChange={this.handleChange.bind(this)} name='AcquisitonPrice' placeholder='Inform the Acquisiton Price, format DD:MM:YYYY' value={this.state.acquisition_price}/>
                        <h3>Item is available to borrow?</h3>
                        <select name="borrow" onChange={this.handleChange.bind(this)} value={this.state.borrow}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                )
                break;
            case "Games":
                forms = (
                    <div>
                        <h3>Console/Platform</h3>
                        <input label='platform' name='platform' placeholder='Inform the console or platform'/>
                        <h3>Genre</h3>
                        <input label='Genre' name='genre' placeholder='Insert the genre'/>
                        <h3>Developer</h3>
                        <input label='Publisher' name='developer' placeholder='Inform the Developer'/>
                        <input label='Publisher' name='publisher' placeholder='Inform the Publisher'/>
                        <h3>Number of Pages</h3>
                        <input label='Pages' name='pages' placeholder='Number of pages'/>
                        <h3>Acquisition Date</h3>
                        <input label='AcquisitionDate' name='AcquisitonDate' placeholder='Inform the Acquisiton Date, format DD:MM:YYYY'/>
                        <h3>Acquisition Price</h3>
                        <input label='AcquisitionPrice' name='AcquisitonPrice' placeholder='Inform the Acquisiton Price, format DD:MM:YYYY'/>
                        <h3>Item is available to borrow?</h3>
                        <select value={this.state.borrow}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                )
                break;
            case "Movies":
                forms = (
                    <div>
                        <h3>Genre</h3>
                        <input label='genre' name='genre' placeholder='Inform the genre'/>
                        <h3>Media</h3>
                        <select value={this.state.moviesmedia}>
                            <option value="Bluray">Bluray</option>
                            <option value="DVD">DVD</option>
                            <option value="VHS">VHS</option>
                        </select>
                        <h3>Acquisition Date</h3>
                        <input label='AcquisitionDate' name='AcquisitonDate' placeholder='Inform the Acquisiton Date, format DD:MM:YYYY'/>
                        <h3>Acquisition Price</h3>
                        <input label='AcquisitionPrice' name='AcquisitonPrice' placeholder='Inform the Acquisiton Price, format DD:MM:YYYY'/>
                        <h3>Item is available to borrow?</h3>
                        <select value={this.state.borrow}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                )
                break;
            case "Music":
                forms = (
                    <div>
                        <h3>Artist</h3>
                        <input label='artist' name='artist' placeholder='Inform the artist'/>
                        <h3>Genre</h3>
                        <input label='genre' name='genre' placeholder='Inform the genre'/>
                        <h3>Media</h3>
                        <select value={this.state.moviesmedia}>
                            <option value="CD">CD</option>
                            <option value="K7">K7</option>
                            <option value="Vynil">Vynil</option>
                        </select>
                        <h3>Acquisition Date</h3>
                        <input label='AcquisitionDate' name='AcquisitonDate' placeholder='Inform the Acquisiton Date, format DD:MM:YYYY'/>
                        <h3>Acquisition Price</h3>
                        <input label='AcquisitionPrice' name='AcquisitonPrice' placeholder='Inform the Acquisiton Price, format DD:MM:YYYY'/>
                        <h3>Item is available to borrow?</h3>
                        <select value={this.state.borrow}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                )
                break;

            }
        return (
            <div class="ui grid">
                <div class="four wide column">
            <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group widths='equal'>
            <input label='Title' name='title' placeholder='Title' />
            <select name="collection" value={this.state.value} onChange={this.handleCollection.bind(this)}>
                <option value=''>Choose you collection</option>
                <option value="Books">Books</option>
                <option value="Games">Games</option>
                <option value="Music">Music</option>
                <option value="Movies">Movies</option>
            </select>
        </Form.Group>

             { forms }
             <Form.Button>Submit</Form.Button>
      </Form>
  </div>
  </div>
        )
    }

}
