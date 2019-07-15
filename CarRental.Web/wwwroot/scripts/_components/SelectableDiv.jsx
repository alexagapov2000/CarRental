import React from 'react';

export default class SelectableDiv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
        };
    }

    switchState = (e) => {
        let isSelectedNow = !this.state.isSelected;
        this.setState({isSelected: isSelectedNow});
        let {controller, source, toDeleteList} = this.props;
        if(isSelectedNow) {
            toDeleteList[controller][source.id] = {id: source.id};
        }
        else {
            delete toDeleteList[controller][source.id];
        }
    }

    render() {
        let selectedStr = this.state.isSelected ? 'selected' : 'unselected';
        let className = `selectable ${selectedStr} ${this.props.className}`;
        return <div className={className} onClick={this.switchState}>
            {this.props.source.name}
        </div>;
    }
}