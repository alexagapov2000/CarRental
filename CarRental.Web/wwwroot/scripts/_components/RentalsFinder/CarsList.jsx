import React from 'react';
import { ListGroup } from "react-bootstrap";
import Axios from 'axios';

export default class CarsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: [],
        };
    }

    componentDidMount() {
        Axios.get('/api/cars')
            .then(cars => cars.data.map(car => {
                return <ListGroup.Item action key={car.id}>{car.name}</ListGroup.Item>
            }))
            .then(cars => this.setState({cars}));
    }

    render() {
        return <ListGroup variant='flush'>
            <ListGroup.Item style={{ textAlign: 'center' }} action>▲</ListGroup.Item>
            {this.state.cars}
            <ListGroup.Item style={{ textAlign: 'center' }} action>▼</ListGroup.Item>
        </ListGroup>;
    }
}