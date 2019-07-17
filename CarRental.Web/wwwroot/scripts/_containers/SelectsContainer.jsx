import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/SelectsActions.jsx';
import Selects from '../_components/Selects.jsx';

class SelectsContainer extends React.Component {
    
    render() {
        return <Selects
            countries={this.props.selects.countries}
            cities={this.props.selects.cities}
            filteredCities={this.props.selects.filteredCities}
            loadCountries={this.props.loadCountries}
            loadCities={this.props.loadCities}
            filterCities={this.props.filterCities}
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        selects: store.selects,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(actions.loadCountries()),
        loadCities: () => dispatch(actions.loadCities()),
        filterCities: countryId => dispatch(actions.filterCities(countryId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectsContainer);