import React from 'react';
import { FormControl, Container, Col, Row } from 'react-bootstrap';
import { debounce } from 'lodash';

export default class LocationsFinderMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = { value: '' };
    }

    handleChange = e => {
        let value = e.target.value.toLowerCase().trim();
        this.setState({ value });
    }

    render() {
        const {
            children,
            style,
            className,
            'aria-labelledby': labeledBy,
        } = this.props;
        const { value } = this.state;

        return (
            <div style={style} className={className} aria-labelledby={labeledBy}>
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={this.handleChange}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children)
                        .filter(child =>
                            !value || child.props.children.toLowerCase().startsWith(value))}
                </ul>
            </div>
        );
    }
}