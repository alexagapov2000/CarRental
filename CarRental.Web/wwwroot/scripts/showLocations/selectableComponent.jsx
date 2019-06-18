import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

export default class SelectableComponent extends React.Component {

    constructor(props) {
        super();
        this.state = {
            selected: false,
        };
        this.switchSelectionState = this.switchSelectionState.bind(this);
        this.delete = this.delete.bind(this);
        document.addEventListener('keydown', this.delete);
    }

    delete(e) {
        if(e.keyCode == 46 && this.state.selected) {
            Axios.delete(`api/${this.props.controller}/${this.props.id}`)
                .then(this.props.incrementDeletedItemsCount());
        }
    }

    switchSelectionState(e) {
        let newState = !this.state.selected;
        this.setState({selected: newState});
        this.props.changeSelectedItemsCount(newState ? 1 : -1);
    }

    render() {
        let selectedStyle = this.state.selected ? 'selected' : 'unselected';
        return <div
                id='selectable-component'
                className={`${this.props.className} selectable ${selectedStyle}`}
                onClick={this.switchSelectionState}>
            {this.props.name}
        </div>;
    }
}