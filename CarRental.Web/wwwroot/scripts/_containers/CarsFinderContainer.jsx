import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/CarsFinderActions.jsx';
import Selects from '../_components/RentalsFinder/CarsFinder.jsx';

class CarsFinderContainer extends React.Component {
    
    render() {
        return <Selects
            cars={this.props.cars}
            loadCars={this.props.loadCars}
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        cars: store.carsFinder.cars,
        isFetching: store.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCars: cityId => dispatch(actions.loadCars(cityId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsFinderContainer);