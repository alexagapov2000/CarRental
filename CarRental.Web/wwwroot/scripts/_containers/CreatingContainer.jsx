import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/CreatingFormActions.jsx';
import * as commonActions from '../_actions/IndexActions.jsx';
import CreatingForm from '../_components/CreatingForm.jsx';

class CreatingContainer extends React.Component {
    
    render() {
        return <CreatingForm
            countries={this.props.countries}
            currentCountry={this.props.creatingForm.currentCountry}

            loadCountries={this.props.loadCountries}
            createCountry={this.props.createCountry}
            createCity={this.props.createCity}
            changeCountry={this.props.changeCountry}
            isFetching={this.props.isFetching}/>;
    }
}

const mapStateToProps = store => {
    return {
        creatingForm: store.creatingForm,
        countries: store.common.countries,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCountries: () => dispatch(commonActions.loadCountries()),
        createCountry: name => dispatch(actions.createCountry(name)),
        createCity: (name, countryId) => dispatch(actions.createCity(name, countryId)),
        changeCountry: (newCountry) => dispatch(actions.changeCountry(newCountry)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatingContainer);