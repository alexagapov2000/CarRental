import React from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../_actions/IndexActions.jsx';
import LocationsFinder from '../_components/LocationsFinder/LocationsFinder.jsx';

class LocationsFinderContainer extends React.Component {
    
    render() {
        return <LocationsFinder
            loadCities={this.props.loadCities}
            isFetching={this.props.isFetching} />;
    }
}

const mapStateToProps = store => {
    return {
        isFetching: store.common.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCities: () => dispatch(commonActions.loadCities()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsFinderContainer);