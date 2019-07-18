import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/LocationsTableActions.jsx';
import * as commonActions from '../_actions/IndexActions.jsx';
import LocationsTable from '../_components/LocationsTable.jsx';

class LocationsTableContainer extends React.Component {

    render() {
        return <LocationsTable
            countries={this.props.countries}
            cities={this.props.cities}
            toDeleteList={this.props.locationsTable.toDeleteList}
            loadCountries={this.props.loadCountries}
            loadCities={this.props.loadCities}
            deleteSeveralObjects={this.props.deleteSeveralObjects}
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        locationsTable: store.locationsTable,
        countries: store.common.countries,
        cities: store.common.cities,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(commonActions.loadCountries()),
        loadCities: () => dispatch(commonActions.loadCities()),
        deleteSeveralObjects: (controller, IDs) => dispatch(actions.deleteSeveralObjects(controller, IDs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTableContainer);