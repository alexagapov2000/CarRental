import React from 'react';
import 'react-daypicker/lib/DayPicker.css';
import DayPicker from 'react-daypicker';
import { Container, Row, Col } from 'react-bootstrap';
import Rental from './Rental.jsx';

export default class RentalsFinder extends React.Component {

    render() {
        return <Container fluid>
            <Row>
                <Col lg='4'>
                    <DayPicker />
                    <DayPicker />
                </Col>
                <Col lg='8'>
                    <Rental info={{ company: 'Car rental inc.', location: 'Krapatunskaya street, 41', description: 'Krapatunskaya is famous for it`s Car rentals and this one is the best! There are huge choise of comfort, luxury, business cars!'}} />
                    <Rental info={{ company: 'Car rental inc.', location: 'Krapatunskaya street, 41' }} />
                    <Rental info={{ company: 'Car rental inc.', location: 'Krapatunskaya street, 41' }} />
                    <Rental info={{ company: 'Car rental inc.', location: 'Krapatunskaya street, 41' }} />
                </Col>
            </Row>
        </Container>;
    }
}