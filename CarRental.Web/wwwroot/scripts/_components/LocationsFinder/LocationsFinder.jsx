import React from 'react';
import 'react-popper';
import Axios from 'axios';
import { Modal, Button, Form, Row, Col, Container, ListGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LocationsFinder.css';
import { debounce } from 'lodash';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class LocationsFinder extends React.Component {

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
            onSelect={(date, e) => {
                let newState = {};
                newState[stateKey] = date;
                this.setState(newState);
            }}
            dateFormat="MMMM d, yyyy h:mm aa">
        </DatePicker>;
    }

    renderLocations = locationsSubstrings => {
        Axios.post('/api/cities/withCountries', { locationsSubstrings })
            .then(response => {
                let cities = response.data.map(city => <ListGroup.Item
                    onClick={async e => {
                        let cityIdQuery = 'cityId=' + encodeURIComponent(city.id);
                        let bookedFromQuery = 'bookedFrom=' + encodeURIComponent(this.state.selectedStartDate);
                        let bookedToQuery = 'bookedTo=' + encodeURIComponent(
                            this.state.selectedFinishDate < this.state.selectedStartDate ?
                                this.state.selectedStartDate :
                                this.state.selectedFinishDate);
                        let redirect = this.props.history.push;
                        await redirect('/');
                        await redirect(`/carsFinder?${cityIdQuery}&${bookedFromQuery}&${bookedToQuery}`);
                        this.hideDialog();
                    }}
                    key={city.id}
                    action>
                    {`${city.countryName.trim()}, ${city.name}`}
                </ListGroup.Item>);
                if (cities.length == 11) {
                    cities = cities.slice(1);
                    cities[9] = <ListGroup.Item key={0} style={{ textAlign: 'center' }}>
                        <span className='typewriter'>Keep typing</span>
                    </ListGroup.Item>;
                }
                return <ListGroup style={{ paddingTop: '20px' }} variant='flush'>{cities}</ListGroup>;
            })
            .then(cities => this.setState({ cities }));
    }

    componentDidMount() {
        this.renderLocations();
    }

    renderModal = debouncedOnChange => {
        return <Modal dialogClassName='locationsFinder' show={this.state.show} onHide={this.hideDialog} centered>
            <Modal.Header closeButton><Modal.Title>Pick location and date range of booking</Modal.Title></Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            {this.renderDatePicker(new Date(), 'selectedStartDate')}
                            {this.renderDatePicker(this.state.selectedStartDate, 'selectedFinishDate')}
                        </Col>
                        <Col>
                            <Form.Control
                                type='input'
                                placeholder='Type location'
                                onChange={e => { e.persist(); debouncedOnChange(e) }} />
                            {this.state.cities}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>;
    }

    render() {
        let debouncedOnChange = debounce(e => this.renderLocations(e.target.value), 500);
        return <React.Fragment>
            <Button variant='outline-light' onClick={e => this.setState({ show: true })}>
                Pick location
            </Button>
            {this.renderModal(debouncedOnChange)}
        </React.Fragment>;
    }
}

export default withRouter(LocationsFinder);