import React from 'react';

export default class SelectableDiv extends React.Component {
    render() {
        let className = 'selectable ' + this.props.className;
        return <div className={className}>
            {this.props.source.name}
        </div>;
    }
}