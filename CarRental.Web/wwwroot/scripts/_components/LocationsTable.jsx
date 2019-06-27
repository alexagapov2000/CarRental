import React from 'react';

class SelectableDiv extends React.Component {
    render() {
        return <div className={this.props.className}>
            {this.props.source.name}
        </div>;
    }
}

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
            return <SelectableDiv source={city} className='cities'>
                {city.name}
            </SelectableDiv>;
        });
        let groupedCities = {};
        citiesComponents.forEach(cityComponent => {
            let id = cityComponent.props.source.id;
            if(groupedCities[id] === undefined)
                groupedCities[id] = [];
            groupedCities[id].push(cityComponent);
            console.log(cityComponent.props.source);
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
                <div>
                    {citiesComponents[countryId]}
                </div>
            </div>;
        });
        return container;
    }

    render() {
        let countriesWithCities = this.renderCountriesWithCities();
        //console.log(countriesWithCities);
        return <div>
            {Object.values(countriesWithCities)}
        </div>;
    }
}