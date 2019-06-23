import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/CreatingFormActions.jsx';
import CreatingForm from '../_components/CreatingForm.jsx';

class CreatingContainer extends React.Component {
    
    render() {
        return <CreatingForm
            countriesController='countries'
            citiesController='cities'
            countries={this.props.creatingForm.countries}
            loadCountries={this.props.loadCountries}
            createCountry={this.props.createCountry}
            mapCountriesToOptions={this.props.mapCountriesToOptions}
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        loadCountries: store.loadCountries,
        creatingForm: store.creatingForm,
        mapCountriesToOptions: store.mapCountriesToOptions,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(actions.loadCountries()),
        createCountry: name => dispatch(actions.createCountry(name)),
        mapCountriesToOptions: countries => dispatch(actions.mapCountriesToOptions(countries)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatingContainer);