import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/LocationsTableActions.jsx';
import LocationsTable from '../_components/LocationsTable.jsx';

class LocationsTableContainer extends React.Component {
    
    render() {
        return <LocationsTable 
            countries={this.props.locationsTable.countries}
            cities={this.props.locationsTable.cities}
            loadCountries={this.props.loadCountries}
            loadCities={this.props.loadCities}
            deleteCountry={this.props.deleteCountry}
            deleteCity={this.props.deleteCity}
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        loadCountries: store.loadCountries,
        loadCities: store.loadCities,
        deleteCountry: store.deleteCountry,
        deleteCity: store.deleteCity,

        locationsTable: store.locationsTable,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(actions.loadCountries()),
        loadCities: () => dispatch(actions.loadCities()),
        deleteCountry: id => dispatch(acitons.deleteCountry(id)),
        deleteCity: id => dispatch(actions.deleteCity(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTableContainer);