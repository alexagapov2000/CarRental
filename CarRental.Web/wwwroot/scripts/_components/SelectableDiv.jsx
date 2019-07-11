import React from 'react';

export default class SelectableDiv extends React.Component {

    

    switchState = () => {

    }

    render() {
        let selected = this.props.isSelected ? 'selected' : 'unselected';
        let className = `selectable ${selected} ${this.props.className}`;
        return <div className={className} onClick={this.props.switchState}>
            {this.props.source.name}
        </div>;
    }
}