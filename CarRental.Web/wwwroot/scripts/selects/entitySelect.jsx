import React from 'react';
import Select from 'react-select';

export default class EntitySelect extends React.Component{
    constructor(props) {
        super();
        this.state = {
            options: [],
            currentID: 0,
        };
        this.changeID = this.changeID.bind(this);
    }

    changeID() {
        let newID = this.refs.select.value;
        this.setState({currentID: newID});
    }

    componentDidMount() {
        this.setState({currentID: this.props.value});
        fetch(this.props.controller)
            .then(resolve => resolve.json())
            .then(entities => entities.map(e =>
                <option id={'option' + e.value} key={e.value} value={e.value}>{e.text}</option>))
            .then(options => this.setState({options}));
    }

    render() {
        return <select ref='select' onChange={this.changeID}>
            {this.state.options}
        </select>;
    }
}