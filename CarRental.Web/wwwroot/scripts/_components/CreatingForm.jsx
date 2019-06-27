import React from 'react';

export default class CreatingForm extends React.Component {
    
    createCountry = async (e) => {
        e.persist();
        if(e.keyCode === 13) {
            await this.props.createCountry(e.target.value);
            this.props.loadCountries();
            e.target.value = '';
        }
    }

    createCity = async (e) => {
        e.persist();
        if(e.keyCode === 13) {
            let cityName = e.target.value;
            let countryId = this.props.currentCountry.id;
            await this.props.createCity(cityName, countryId);
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
                onKeyDown={this.createCountry}/>
        </fieldset>;
    }

    changeCountry = e => {
        let newCountryIndex = e.target.selectedIndex;
        let newCountry = this.props.countries[newCountryIndex];
        this.props.changeCountry(newCountry);
    }

    renderCitiesCreatingForm = () => {
        return <fieldset>
            <legend>Cities creating form</legend>
            <select onChange={this.changeCountry}>
                {this.mapCountriesToOptions(this.props.countries)}
            </select>
            <input
                type='text'
                placeholder='Enter city name'
                onKeyDown={this.createCity}/>
        </fieldset>;
    }

    componentDidMount() {
        this.props.loadCountries();
    }

    render() {
        return <div>
            {this.renderCountriesCreatingForm()}
            {this.renderCitiesCreatingForm()}
        </div>;
    }
}