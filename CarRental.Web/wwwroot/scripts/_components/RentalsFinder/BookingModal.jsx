import React from 'react';
import { Alert, Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import queryString from 'query-string';
import { addDays, subDays } from 'date-fns';
import { store } from '../../_store/configureStore.jsx';
import { withRouter } from 'react-router-dom';
import AuthFormContainer from '../../_containers/AuthFormContainer.jsx';
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

class BookingModal extends React.Component {

    constructor(props) {
        super(props);
        let { bookedFrom, bookedTo } = queryString.parse(window.location.search);
        this.state = {
            bookedFrom: new Date(new Date(bookedFrom).setUTCHours(12, 0, 0, 0)),
            bookedTo: new Date(new Date(bookedTo).setUTCHours(12, 0, 0, 0)),
            showAlert: false,
        };
    }

    hideDialog = () => this.props.onHide()

    submitPurchase = async e => {
        this.setState({ showAlert: true });
        await this.props.submitPurchase(
            store.getState().common.account.username,
            this.props.id,
            this.state.bookedFrom,
            this.state.bookedTo);
        let { pathname, search } = this.props.location;
        await this.props.history.push('/');
        await this.props.history.push(pathname + search);
    }

    renderAlert = () => {
        return !this.props.isOrderWasMade && this.state.showAlert ?
            <Alert variant='danger'>{this.props.dangerMessage}</Alert> :
            null;
    }

    componentDidMount() {
        this.setState({ show: this.props.show });
    }

    render() {
        let okImage = this.props.isPausedAfterSubmitting ?
            <div className='imageBackground'>
                <Image className='okImage' src='../../../CarRentalIcons/ok.png' />
            </div> :
            null;
        let submitButton = this.props.isAuthorized ?
            <Button onClick={this.submitPurchase} disabled={isDisabled}>Submit</Button> :
            <AuthFormContainer variant='outline-dark' />;
        let isDisabled = this.props.isFetching;
        let bookingDates = getDatesBetween(this.state.bookedFrom, this.state.bookedTo);
        let { name, price, rentalCompanyName, seats, fuelConsumption, id } = this.props;
        return <Modal show={this.props.show} onHide={this.hideDialog} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalInfo'>
                {okImage}
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
                            disabled={isDisabled}
                            includeDates={bookingDates}
                            calendarClassName='pickedDates' />
                    </Col>
                    <Col lg={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <Form.Control disabled={isDisabled} type='input' placeholder='Your name and surname'></Form.Control>
                        <Form.Control disabled={isDisabled} type='number' placeholder='Driver license number'></Form.Control>
                        <Row>
                            <Col lg={3}><Form.Control disabled={isDisabled} placeholder='+375'></Form.Control></Col>
                            <Col lg={9}><Form.Control disabled={isDisabled} placeholder='29-000-0000' type='number'></Form.Control></Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                {submitButton}
            </Modal.Footer>
            {this.renderAlert()}
        </Modal>;
    }
}

export default withRouter(BookingModal);