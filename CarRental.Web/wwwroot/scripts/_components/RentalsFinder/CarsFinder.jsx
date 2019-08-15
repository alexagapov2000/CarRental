import React from 'react';
//import 'react-daypicker/lib/DayPicker.css';
//import DayPicker from 'react-daypicker';
import { Container, Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import SameCarsCard from './SameCarsCards.jsx';
import { store } from '../../_store/configureStore.jsx';
import EmptyNotificator from '../EmptyNotificator.jsx';

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

    renderSortButtons = () => {
        return <ButtonToolbar className='d-flex flex-column' style={{ position: 'sticky', top: '0' }}>
            <ToggleButtonGroup vertical
                style={{ margin: '9px 0 10px' }} type='radio' name='options' defaultValue={'price'}
                onChange={value => this.setState({ orderbyPropertyName: value })}>
                <ToggleButton variant='none' size='lg' value={0} disabled>Sort cars by</ToggleButton>
                <ToggleButton variant='outline-dark' value={'price'}>Price</ToggleButton>
                <ToggleButton variant='outline-dark' value={'name'}>Car model name</ToggleButton>
                <ToggleButton variant='outline-dark' value={'seats'}>Count of seats</ToggleButton>
                <ToggleButton variant='outline-dark' value={'rental'}>Rent company name</ToggleButton>
                <ToggleButton variant='outline-dark' value={'fuel'}>Fuel consumption</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
                style={{ margin: '10px 0 20px' }} type='radio' name='options' defaultValue={false}
                onChange={value => this.setState({ isDescending: value })}>
                <ToggleButton variant='outline-secondary' value={false} size='sm'>Ascending</ToggleButton>
                <ToggleButton variant='outline-secondary' value={true} size='sm'>Descending</ToggleButton>
            </ToggleButtonGroup>
        </ButtonToolbar>;
    }

    componentDidMount() {
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
                0, store.getState().carsFinder.cars.length,
                nextState.isDescending, nextState.orderbyPropertyName);
        }
    }

    render() {
        let sameCarsCards = this.renderSameCarsCards();
        if(sameCarsCards.length == 0)
        return <EmptyNotificator>There is no any offer on this location! You may repick booking dates!</EmptyNotificator>;
        return <Container>
            <Row>
                <Col lg='4'>
                    {this.renderSortButtons()}
                </Col>
                <Col lg='8'>
                    {sameCarsCards}
                </Col>
            </Row>
        </Container>;
    }
}