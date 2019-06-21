import React from 'react';
import { connect } from 'react-redux';
import createCountry from '../_actions/CreatingFormActions.jsx';
import CreatingForm from '../_components/CreatingForm.jsx';

class CreatingContainer extends React.Component {
    
    render() {
        return <CreatingForm
            countriesController='countries'
            citiesController='cities'/>;
    }
}

const mapStateToProps = store => {
    return {
        creatingForm: store.creatingForm,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        countries: name => dispatch(createCountry(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatingContainer);