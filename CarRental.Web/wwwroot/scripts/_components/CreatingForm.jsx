import React from 'react';
import PropTypes from 'prop-types';

export default class CreatingForm extends React.Component {
    
    onKeyDown = (e) => {
        if(e.keyCode === 13) {
            this.props.createCountry(e.target.value);
            this.props.loadCountries();
            //this.props.mapCountriesToOptions();
            e.target.value = '';
        }
    }

    renderCountriesCreatingForm = () => {
        return <fieldset>
            <legend>Countries creating form</legend>
            <input
                type='text'
                placeholder='Enter country name'
                onKeyDown={this.onKeyDown}/>
        </fieldset>;
    }

    renderCitiesCreatingForm = () => {
        return <fieldset>
            <legend>Cities creating form</legend>
            <select></select>
            <input type='text' placeholder='Enter city name'/>
        </fieldset>;
    }

    render() {
        console.log(this.props.countries);
        return <div>
            {this.renderCountriesCreatingForm()}
            {this.renderCitiesCreatingForm()}
        </div>;
    }
}

CreatingForm.propTypes = {
    countriesController: PropTypes.string.isRequired,
    citiesController: PropTypes.string.isRequired,
};