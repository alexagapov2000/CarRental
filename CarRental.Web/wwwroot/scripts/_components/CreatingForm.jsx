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
            console.log(this.props.countries)
            console.log(e.)//kal достать значение из селекта (не e.target.value)
            let countryId = this.props.countries[e.target.selectedIndex].id;
            await this.props.createCity(e.target.value, countryId);
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

    renderCitiesCreatingForm = () => {
        return <fieldset>
            <legend>Cities creating form</legend>
            <select>{this.mapCountriesToOptions(this.props.countries)}</select>
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