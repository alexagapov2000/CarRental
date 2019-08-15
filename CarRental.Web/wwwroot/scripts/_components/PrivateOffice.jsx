import React from 'react';
import { Container, Card, Image } from 'react-bootstrap';
import './PrivateOffice.css';
import EmptyNotificator from './EmptyNotificator.jsx';

export default class PrivateOffice extends React.Component {

    constructor(props) {
        super(props);
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

    renderOrders = () => {
        console.log(this.props.orders)
        if (this.props.orders.length == 0)
            return <EmptyNotificator>You don't have any orders!</EmptyNotificator>;
        return this.props.orders.map((order, id) => {
            return <Card key={id} border='dark' style={{ margin: '20px 0px 20px' }}>
                <Card.Header>
                    <Card.Title>{order.name}</Card.Title>
                    <Card.Subtitle>{order.location}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    {this.renderProperty('Booked from', new Date(order.bookedFrom).toDateString())}
                    <hr />
                    {this.renderProperty('Booked to', new Date(order.bookedTo).toDateString())}
                    <hr />
                    {this.renderProperty('Rent company name', order.rentalCompanyName)}
                    <hr />
                    {this.renderProperty('Seats', order.seats + ' adult seats')}
                    <hr />
                    {this.renderProperty('Fuel consumption', order.fuelConsumption + ' litres per 100km')}
                </Card.Body>
            </Card>;
        });
    }

    componentDidMount() {
        //this.props.reAuthUser();
        this.props.loadOrders(this.props.username);
    }

    render() {
        return <Container>
            {this.renderOrders()}
        </Container>;
    }
}