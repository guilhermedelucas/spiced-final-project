import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

export default class GamesForm extends React.Component {
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
        return (
            <div class="ui grid">
                <div class="four wide column">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group widths='equal'>
                        <input label='Title' name='title' placeholder='Title' />
                    </Form.Group>
                <div>
                    <h3>Console/Platform</h3>
                    <input label='platform' name='platform' placeholder='Inform the console or platform'/>
                    <h3>Genre</h3>
                    <input label='Genre' name='genre' placeholder='Insert the genre'/>
                    <h3>Developer</h3>
                    <input label='Publisher' name='developer' placeholder='Inform the Developer'/>
                    <h3>Publisher</h3>
                    <input label='Publisher' name='publisher' placeholder='Inform the Publisher'/>
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
                    <Form.Button>Submit</Form.Button>
                    </Form>
                </div>
            </div>
        )
    }

}
