import React from 'react';
import SelectableDiv from '../_components/SelectableDiv.jsx';

export default class LocationsTable extends React.Component {

    constructor(props) {
        super(props);
    }

    deleteSeveralObjects = async e => {
        if(e.keyCode == 46) {
            let {cities, countries} = this.props.toDeleteList;
            await this.props.deleteSeveralObjects('cities', Object.keys(cities));
            await this.props.deleteSeveralObjects('countries', Object.keys(countries));
            await this.props.loadCities();
            await this.props.loadCountries();
        }
    }

    renderCountriesComponents = () => {
        return this.props.countries.map(country => {
            return <SelectableDiv
                    toDeleteList={this.props.toDeleteList}
                    controller='countries'
                    source={country}
                    className='countries'>
                {country.name}
            </SelectableDiv>;
        });
    }

    renderCitiesComponents = () => {
        let citiesComponents = this.props.cities.map((city, index) => {
            return <SelectableDiv
                    toDeleteList={this.props.toDeleteList}
                    key={index}
                    controller='cities'
                    source={city}
                    className='cities'>
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
        countriesComponents.forEach((countryComponent, index) => {
            let countryId = countryComponent.props.source.id;
            container[countryId] = <div key={index} className='countries-cities'>
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
        document.addEventListener('keyup', this.deleteSeveralObjects);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.deleteSeveralObjects);
    }

    render() {
        let countriesWithCities = this.renderCountriesWithCities();
        return <div>
            {Object.values(countriesWithCities)}
        </div>;
    }
}