import React from 'react';
import SelectableDiv from './SelectableDiv.jsx'

export default class LocationsTable extends React.Component {

    renderCountriesComponents = () => {
        return this.props.countries.map(country => {
            return <SelectableDiv source={country} className='countries'>
                {country.name}
            </SelectableDiv>;
        });
    }

    renderCitiesComponents = () => {
        let citiesComponents = this.props.cities.map(city => {
            return <SelectableDiv source={city}>
                {city.name}
            </SelectableDiv>;
        });
        let groupedCities = {};
        citiesComponents.forEach(cityComponent => {
            let countryId = cityComponent.props.source.countryId;
            if(groupedCities[countryId] === undefined)
                groupedCities[countryId] = [];
            groupedCities[countryId].push(cityComponent);
        });
        return groupedCities;
    }

    renderCountriesWithCities = () => {
        let container = {};
        let countriesComponents = this.renderCountriesComponents();
        let citiesComponents = this.renderCitiesComponents();
        countriesComponents.forEach(countryComponent => {
            let countryId = countryComponent.props.source.id;
            container[countryId] = <div className='countries-cities'>
                {countryComponent}
                <div className='cities'>
                    {citiesComponents[countryId]}
                </div>
            </div>;
        });
        return container;
    }

    componentDidMount() {
        this.props.loadCountries();
        this.props.loadCities();
    }

    render() {
        let countriesWithCities = this.renderCountriesWithCities();
        //console.log(countriesWithCities);
        return <div>
            {Object.values(countriesWithCities)}
        </div>;
    }
}