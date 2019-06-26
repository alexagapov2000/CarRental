import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/CreatingFormActions.jsx';
import CreatingForm from '../_components/CreatingForm.jsx';

class CreatingContainer extends React.Component {
    
    render() {
        return <CreatingForm
            countries={this.props.creatingForm.countries}
            loadCountries={this.props.loadCountries}
            createCountry={this.props.createCountry}
            createCity={this.props.createCity}
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        loadCountries: store.loadCountries,
        createCountry: store.createCountry,
        createCity: store.createCity,
        
        creatingForm: store.creatingForm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(actions.loadCountries()),
        createCountry: name => dispatch(actions.createCountry(name)),
        createCity: (name, countryId) => dispatch(action.createCity(name, countryId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatingContainer);