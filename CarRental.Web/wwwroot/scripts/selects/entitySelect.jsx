import React from 'react';

export default class EntitySelect extends React.Component {
    constructor(props) {
        super();
        this.options = [];
    }

    componentWillMount() {
        fetch(this.props.controller)
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