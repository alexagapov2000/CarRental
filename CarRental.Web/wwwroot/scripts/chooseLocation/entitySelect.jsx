import React from 'react';

export default class EntitySelect extends React.Component{
    constructor(props) {
        super();
        this.state = {
            options: [],
            currentID: 0,
        };
        this.loadList = this.loadList.bind(this);
    }

    loadList() {
        fetch(this.props.controller)
            .then(resolve => resolve.json())
            .then(entities => entities.map(e =>
                <option key={e.id} value={e.id}>{e.name}</option>))
            .then(options => this.setState({options}));
    }

    componentDidMount() {
        this.loadList();
    }

    render() {
        return <select onChange={this.props.onChange} ref='select'>
            {this.state.options}
        </select>;
    }
}