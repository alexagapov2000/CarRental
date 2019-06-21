import React from 'react';
import PropTypes from 'prop-types';

export default class CreatingForm extends React.Component {
    
    loadCountries = (controller) => {
        
    }

    renderCountriesCreatingForm = () => {
        return <fieldset>
            <legend>Countries creating form</legend>
            <input type='text' placeholder='Enter country name'/>
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