import React from 'react';

export default class EntitySelect extends React.Component {
    constructor(props) {
        super();
        this.getOptions = this.getOptions.bind(this);
        this.options = [];
    }

    componentWillMount() {
        this.getOptions();
    }

    getOptions() {
        return fetch(this.props.controller)
            .then(resolve => resolve.json())
            .then(entities => entities.map(element => 
                <option value={element.value}>{element.text}</option>))
            .then(option => this.options.push(option));
    }

    render() {
        return <select>
            {this.options}
        </select>;
    }
}

EntitySelect.defaultProps = {controller: 'GetCountries'};