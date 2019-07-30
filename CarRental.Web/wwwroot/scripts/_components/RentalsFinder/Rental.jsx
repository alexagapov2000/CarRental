import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Collapse, Button, ListGroup } from 'react-bootstrap';
import CarsList from './CarsList.jsx';

class Rental extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    render() {
        let { company, location, description } = this.props.info;
        return <Card border='dark' style={{ margin: '20px' }}>
            <Card.Header>
                <Card.Img style={{ width: '50px', height: '50px' }} src='../../../CarRentalIcons/48688.png'></Card.Img>
                <Card.Title>{company}</Card.Title>
                <hr />
                <Card.Subtitle>{location}</Card.Subtitle>
                <hr />
                <Card.Text>{description}</Card.Text>
            </Card.Header>
            <Collapse in={this.state.opened}>
                <Card.Body>
                    <CarsList />
                </Card.Body>
            </Collapse>
            <Card.Footer as={Button} variant='light' onClick={e => this.setState({ opened: !this.state.opened })}>
                {this.state.opened ? 'Hide cars' : 'Cars'}
            </Card.Footer>
        </Card>;
    }
}

export default withRouter(Rental);