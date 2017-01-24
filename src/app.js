import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class HelloWorld extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            total: []
        };
    }

    componentWillMount() {
    axios.get('/test').then((response) => {
        console.log(_.keys(response.data.userData.collection));
        console.log(_.groupBy(response.data.userData.collection.books, 'genre'));
        const totalMoney = _.map(response.data.userData.collection, function(item) {
            return _.reduce(_.pluck(item, "acquisition_price"), function(memo, num) {
                return memo + num
            }, 0)
        });
        var totalAmount = Math.round(_.reduce(totalMoney, function(memo, num) {
            return memo + num
        }, 0));
        // console.log(totalAmount);
        this.setState({
            total: _.keys(response.data.userData.collection)
        })
        return totalAmount
        // console.log(numberTotal);
        // console.log(this.state.total);
        // console.log(totalMoney);
    })
};

        render() {
            const test = this.state.total.map((item, index) =>
            <li key={item + index}>{item}</li>);
            return (
                <div>
                <h1>Hello World</h1>
                    <h2>Hello</h2>
                    <ul>
                    {test}
                    </ul>
                </div>
            )
        }
    }

    ReactDOM.render(
        <HelloWorld/>, document.getElementById('main'));

    //
    //         class Help extends Component {
    //   render() {
    //     return (
    //       <div>
    //         <RaisedButton label="Help"/>
    //       </div>
    //     );
    //   }
    // }
