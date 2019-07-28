import React from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

class CustomMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { value: '' };
    }

    handleChange = e => {
        this.setState({ value: e.target.value.toLowerCase().trim() });
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
                    {React.Children.toArray(children).filter(
                        child =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    }
}

export default class LocationsFinder extends React.Component {
    render() {
        return <Dropdown>
            <Dropdown.Toggle variant='outline-light' id="dropdown-custom-components">
                Find car rental point
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                <Dropdown.Item eventKey="1">Redo</Dropdown.Item>
                <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                <Dropdown.Item eventKey="3">Orange</Dropdown.Item>
                <Dropdown.Item eventKey="4">Red</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>;
    }
}