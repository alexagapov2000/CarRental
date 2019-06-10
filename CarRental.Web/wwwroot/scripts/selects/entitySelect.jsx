import React from 'react';

export default class EntitySelect extends React.Component {
    constructor(props) {
        this.getOptions = this.getOptions.bind(this);
        this.getEntities = this.getEntities.bind(this);
    }

    getEntities() {
        return (dispatch) => {
            fetch(`api/${this.props.route}`)
                .then(response => {
                    let info = response.json();
                    console.log(info);
                    return info;
                })
                .then(dispatch('OK'));
        }
    }

    getOptions() {
        let entities = this.getEntities();
        return entities.map(element => 
                <option value={element.id}>{element.name}</option>
            );
    }

    render() {
        return <select>
            {getOptions()}
        </select>
    }
}

EntitySelect.defaultProps = {route: 'countries'};