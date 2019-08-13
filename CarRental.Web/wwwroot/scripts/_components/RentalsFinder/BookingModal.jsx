import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import queryString from 'query-string';
import { addDays, subDays } from 'date-fns';
import './BookingModal.css';

const getDatesBetween = (firstDate, lastDate) => {
    let result = [];
    let currentDate = firstDate;
    while (currentDate <= lastDate) {
        result.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }
    return result.length == 0 ? [firstDate] : result;
}

export default class BookingModal extends React.Component {

    constructor(props) {
        super(props);
        let query = queryString.parse(window.location.search);
        this.state = {
            bookedFrom: new Date(query.bookedFrom),
            bookedTo: new Date(query.bookedTo),
        };
    }

    hideDialog = () => this.props.onHide()

    componentDidMount() {
        this.setState({ show: this.props.show });
    }

    render() {
        let bookingDates = getDatesBetween(this.state.bookedFrom, this.state.bookedTo);
        let { name, price, rentalCompanyName, seats, fuelConsumption, id } = this.props;
        return <Modal show={this.props.show} onHide={this.hideDialog} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalInfo'>
                <strong>Rental: </strong>
                <span style={{ fontSize: '20px' }}>{rentalCompanyName}</span>
                <hr />
                <strong>Cost: </strong>
                <span style={{ fontSize: '20px' }}>
                    {`$${price.toFixed(2)} × ${bookingDates.length} days = $${(price * bookingDates.length).toFixed(2)}`}
                </span>
                <hr />
                <strong>Fuel consumption: </strong>
                <span style={{ fontSize: '20px' }}>{fuelConsumption + ' litres / 100km'}</span>
                <hr />
                <strong>Seats: </strong>
                <span style={{ fontSize: '20px' }}>{seats + ' adult seats'}</span>
                <hr />
                <Row>
                    <Col lg={4}>
                        <DatePicker inline
                            includeDates={bookingDates}
                            calendarClassName='pickedDates' />
                    </Col>
                    <Col lg={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Form.Control type='input' placeholder='Your name and surname'></Form.Control>
                        <Form.Control type='input' placeholder='Driver license number'></Form.Control>
                        <Form.Control type='input' placeholder='Birth date'></Form.Control>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.submit}>Submit</Button>
            </Modal.Footer>
        </Modal>;
    }
}