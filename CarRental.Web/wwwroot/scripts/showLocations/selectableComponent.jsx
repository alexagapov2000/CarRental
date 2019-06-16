import React from 'react';
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
            Axios.delete(`api/${this.props.controller}/${this.props.id}`);
            this.setState({selected: false});
        }
    }

    switchSelectionState(e) {
        this.setState({selected: !this.state.selected});
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