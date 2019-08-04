import React from 'react';
import 'react-popper';
import Axios from 'axios';
import { Modal, Button, Form, Row, Col, Container, ListGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LocationsFinder.css';
import { withRouter } from 'react-router-dom';

export default class LocationsFinder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            show: false,
            selectedStartDate: new Date(),
            selectedFinishDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        };
    }

    showDialog = () => this.setState({ show: true })
    hideDialog = () => this.setState({ show: false })

    renderDatePicker = (minDate, stateKey) => {
        return <DatePicker
            inline
            fixedHeight
            minDate={minDate}
            selected={this.state[stateKey] > minDate ? this.state[stateKey] : minDate}
            onChange={(a, b) => {
                let newState = {};
                newState[stateKey] = a;
                this.setState(newState);
            }}>
        </DatePicker>;
    }

    renderLocations = () => {
        Axios.get('/api/cities/withCountries')
            .then(response => {
                console.log(response.data);
                let cities = response.data.map(city => <ListGroup.Item action>{city.name}</ListGroup.Item>);
                return <ListGroup variant='flush'>{cities}</ListGroup>;
            })
            .then(cities => this.setState({cities}));
    }

    componentDidMount() {
        this.renderLocations();
    }

    renderModal = () => {
        return <Modal dialogClassName='locationsFinder' show={this.state.show} onHide={this.hideDialog} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            {this.renderDatePicker(new Date(), 'selectedStartDate')}
                            {this.renderDatePicker(this.state.selectedStartDate, 'selectedFinishDate')}
                        </Col>
                        <Col>
                            <Form.Control type='input' placeholder='Type location'></Form.Control>
                            {this.state.cities}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={this.hideDialog}>Submit</Button>
            </Modal.Footer>
        </Modal>;
    }

    render() {
        return <React.Fragment>
            <Button variant='outline-light' onClick={e => this.setState({ show: true })}>
                Pick location
            </Button>
            {this.renderModal()}
        </React.Fragment>;
    }
}