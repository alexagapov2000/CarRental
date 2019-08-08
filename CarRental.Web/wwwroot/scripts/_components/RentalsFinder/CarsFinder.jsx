import React from 'react';
import 'react-daypicker/lib/DayPicker.css';
import DayPicker from 'react-daypicker';
import { Container, Row, Col } from 'react-bootstrap';
import SameCarsCard from './SameCarsCards.jsx';

export default class CarsFinder extends React.Component {

    renderSameCarsCards = () => {
        return this.props.cars
            .map((car, id) => <SameCarsCard key={id} info={car} />);
    }

    componentDidMount() {
        let {cityId, bookedFrom, bookedTo} = this.props;
        this.props.loadCars(cityId, bookedFrom, bookedTo);
    }

    render() {
        return <Container>
            <Row>
                <Col key={0} lg='4'>
                    <DayPicker />
                    <DayPicker />
                </Col>
                <Col key={1} lg='8'>
                    {this.renderSameCarsCards()}
                </Col>
            </Row>
        </Container>;
    }
}