import React from 'react';

export default class SelectableDiv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
        };
    }

    switchState = (e) => {
        let isSelectedNew = !this.state.isSelected;
        this.setState({isSelected: isSelectedNew});
        let {controller, source, toDeleteList} = this.props;
        if(isSelectedNew) {
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