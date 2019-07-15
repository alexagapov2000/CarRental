import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/LocationsTableActions.jsx';
import LocationsTable from '../_components/LocationsTable.jsx';

class LocationsTableContainer extends React.Component {

    render() {
        return <LocationsTable
            countries={this.props.locationsTable.countries}
            cities={this.props.locationsTable.cities}
            toDeleteList={this.props.locationsTable.toDeleteList}
            loadCountries={this.props.loadCountries}
            loadCities={this.props.loadCities}
            deleteSeveralObjects={this.props.deleteSeveralObjects}
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        loadCountries: store.loadCountries,
        loadCities: store.loadCities,
        deleteSeveralObjects: store.deleteSeveralObjects,

        locationsTable: store.locationsTable,
        toDeleteList: store.toDeleteList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(actions.loadCountries()),
        loadCities: () => dispatch(actions.loadCities()),
        deleteSeveralObjects: (controller, IDs) => dispatch(actions.deleteSeveralObjects(controller, IDs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsTableContainer);