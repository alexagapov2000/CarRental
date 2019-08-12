import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/CarsFinderActions.jsx';
import Selects from '../_components/RentalsFinder/CarsFinder.jsx';
import queryString from 'query-string';

class CarsFinderContainer extends React.Component {

    render() {
        let query = this.props.location.search;
        let { cityId, bookedFrom, bookedTo } = queryString.parse(query);
        return <Selects
            cars={this.props.cars}
            loadCars={this.props.loadCars}
            isFetching={this.props.isFetching}
            cityId={cityId}
            bookedFrom={new Date(bookedFrom)}
            bookedTo={new Date(bookedTo)} />;
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
        loadCars: (cityId, bookedFrom, bookedTo) => dispatch(actions.loadCars(cityId, bookedFrom, bookedTo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsFinderContainer);