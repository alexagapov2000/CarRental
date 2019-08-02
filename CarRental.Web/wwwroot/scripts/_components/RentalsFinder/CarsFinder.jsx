import React from 'react';
import 'react-daypicker/lib/DayPicker.css';
import DayPicker from 'react-daypicker';
import { Container, Row, Col } from 'react-bootstrap';
import SameCarsCard from './Rental.jsx';
import { loadCars } from '../../_actions/CarsFinderActions.jsx';

export default class RentalsFinder extends React.Component {

    renderSameCarsCards = () => {
        return this.props.cars
            .map(car => <SameCarsCard info={car} />);
    }

    componentDidMount() {
        this.props.loadCars(486);
    }
    
    render() {
        return <Container fluid>
            <Row>
                <Col lg='4'>
                    <DayPicker />
                    <DayPicker />
                </Col>
                <Col lg='8'>
                    {this.renderSameCarsCards()}
                </Col>
            </Row>
        </Container>;
    }
}