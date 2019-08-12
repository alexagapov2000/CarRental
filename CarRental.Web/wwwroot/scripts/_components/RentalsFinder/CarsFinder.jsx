import React from 'react';
//import 'react-daypicker/lib/DayPicker.css';
//import DayPicker from 'react-daypicker';
import { Container, Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import SameCarsCard from './SameCarsCards.jsx';

export default class CarsFinder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderbyPropertyName: 'price',
            isDescending: false,
        };
    }

    renderSameCarsCards = () => {
        return this.props.cars
            .map((car, id) => <SameCarsCard key={id} info={car} />);
    }

    componentDidMount() {
        console.log('kal');
        let { cityId, bookedFrom, bookedTo } = this.props;
        this.props.loadCars(cityId, bookedFrom, bookedTo);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.orderbyPropertyName != this.state.orderbyPropertyName ||
            nextState.isDescending != this.state.isDescending) {
            let { cityId, bookedFrom, bookedTo } = this.props;
            this.props.loadCars(
                cityId,
                bookedFrom, bookedTo,
                0, 1000,
                nextState.isDescending, nextState.orderbyPropertyName);
        }
    }

    render() {
        return <Container>
            <Row>
                <Col key={0} lg='4'>
                    <ButtonToolbar className='d-flex flex-column' style={{ position: 'sticky', top: '0' }}>
                        <ToggleButtonGroup vertical
                            style={{ margin: '20px 0 10px' }} type='radio' name='options' defaultValue={'price'}
                            onChange={value => this.setState({ orderbyPropertyName: value })}>
                            <ToggleButton variant='secondary' value={0} disabled>Sort cars by</ToggleButton>
                            <ToggleButton variant='outline-dark' value={'price'}>Price</ToggleButton>
                            <ToggleButton variant='outline-dark' value={'name'}>Car model name</ToggleButton>
                            <ToggleButton variant='outline-dark' value={'seats'}>Count of seats</ToggleButton>
                            <ToggleButton variant='outline-dark' value={'rental'}>Rent company name</ToggleButton>
                            <ToggleButton variant='outline-dark' value={'fuel'}>Fuel consumption</ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                            style={{ margin: '10px 0 20px' }} type='radio' name='options' defaultValue={false}
                            onChange={value => this.setState({ isDescending: value })}>
                            <ToggleButton variant='outline-dark' value={false}>Ascending</ToggleButton>
                            <ToggleButton variant='outline-dark' value={true}>Descending</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </Col>
                <Col key={1} lg='8'>
                    {this.renderSameCarsCards()}
                </Col>
            </Row>
        </Container>;
    }
}