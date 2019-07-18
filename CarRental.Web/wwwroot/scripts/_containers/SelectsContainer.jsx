import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/SelectsActions.jsx';
import * as commonActions from '../_actions/IndexActions.jsx';
import Selects from '../_components/Selects.jsx';

class SelectsContainer extends React.Component {
    
    render() {
        return <Selects
            countries={this.props.countries}
            cities={this.props.cities}
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
        countries: store.common.countries,
        cities: store.common.cities,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(commonActions.loadCountries()),
        loadCities: () => dispatch(commonActions.loadCities()),
        filterCities: countryId => dispatch(actions.filterCities(countryId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectsContainer);