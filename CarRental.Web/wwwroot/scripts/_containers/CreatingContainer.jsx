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
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        loadCountries: store.loadCountries,
        mapCountriesToOptions: store.mapCountriesToOptions,
        
        creatingForm: store.creatingForm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(actions.loadCountries()),
        createCountry: name => dispatch(actions.createCountry(name)),
        mapCountriesToOptions: countries => dispatch(actions.mapCountriesToOptions(countries)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatingContainer);