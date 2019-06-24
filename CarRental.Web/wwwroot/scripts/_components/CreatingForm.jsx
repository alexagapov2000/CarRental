import React from 'react';
import PropTypes from 'prop-types';

export default class CreatingForm extends React.Component {
    
    onKeyDown = async (e) => {
        e.persist();
        if(e.keyCode === 13) {
            await this.props.createCountry(e.target.value);
            this.props.loadCountries();
            e.target.value = '';
        }
    }

    mapCountriesToOptions = (countries) => {
        return countries.map(x => {
            return <option value={x.id} key={x.id}>{x.name}</option>;
        });
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
            <select>{this.mapCountriesToOptions(this.props.countries)}</select>
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