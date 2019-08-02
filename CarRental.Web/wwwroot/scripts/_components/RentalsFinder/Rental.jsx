import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Collapse, Button, ListGroup } from 'react-bootstrap';
import OtherOffersList from './OtherOffersList.jsx';

class SameCarsCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    renderProperty = (key, value) => {
        return <React.Fragment>
            <Card.Subtitle>
                {key}
            </Card.Subtitle>
            <Card.Subtitle style={{ textAlign: 'right', color: '#707070', fontWeight: '400' }}>
                {value}
            </Card.Subtitle>
        </React.Fragment>;
    }

    renderFooter = () => {
        if (this.props.info.length <= 1)
            return null;
        return <Card.Footer as={Button} variant='light' onClick={e => this.setState({ opened: !this.state.opened })}>
            {this.state.opened ? 'Hide other offers' : `More offers (${this.props.info.length - 1})`}
        </Card.Footer>;
    }

    render() {
        let { name, price, rentalCompanyName, seats, fuelConsumption, count } = this.props.info[0];
        return <Card border='secondary' style={{ margin: '20px' }}>
            <Card.Header>
                <Card.Img style={{ width: '50px', height: '50px' }} src='../../../CarRentalIcons/48688.png'></Card.Img>
                <Card.Title>{name}</Card.Title>
                <Card.Title>{`$${price} per day`}</Card.Title>
                <Card.Subtitle>{rentalCompanyName}</Card.Subtitle>
                <hr />
                {this.renderProperty('Fuel consumption', `${fuelConsumption} litres per 100 km`)}
                <hr />
                {this.renderProperty('Seats', `${seats} adult seats`)}
                <hr />
                {this.renderProperty('Count', `${count} not booked`)}
            </Card.Header>
            <Collapse in={this.state.opened}>
                <Card.Body>
                    <OtherOffersList info={this.props.info.slice(1)} />
                </Card.Body>
            </Collapse>
            {this.renderFooter()}
        </Card>;
    }
}

export default withRouter(SameCarsCard);