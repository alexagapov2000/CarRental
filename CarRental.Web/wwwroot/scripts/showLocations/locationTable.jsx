import React from 'react'
import SelectableComponent from './selectableComponent.jsx'

export default class LocationTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
        };
        this.getCountries = this.getCountries.bind(this);
        this.fillCountriesWithCities = this.fillCountriesWithCities.bind(this);
        this.mapCitiesToReact = this.mapCitiesToReact.bind(this);
        this.mapCountriesToReact = this.mapCountriesToReact.bind(this);
        this.load = this.load.bind(this);
        document.addEventListener('keydown', this.load);
    }

    getCountries() {
        return fetch('api/countries')
            .then(resolve => resolve.json())
            .then(entities => {
                let countries = {};
                entities.forEach(e => {
                    countries[e.id] = {id: e.id, name: e.name, cities: []};
                });
                return countries;
            });
    }

    fillCountriesWithCities(countries) {
        return fetch('api/cities')
            .then(resolve => resolve.json())
            .then(json => json.forEach(city => {
                return countries[city.countryId].cities.push({name: city.name, id: city.id});
            }))
            .then(x => countries);
    }

    mapCitiesToReact(countries) {
        Object.values(countries).forEach(country => {
            country.cities = country.cities.map(c => {
                return <SelectableComponent
                    id={c.id} name={c.name}
                    controller='cities'/>
            })});
        return countries;
    }

    mapCountriesToReact(countries) {
        Object.keys(countries).forEach(key => {
            countries[key] = <div className='countries-cities'>
                <SelectableComponent
                    className='countries'
                    id={countries[key].id}
                    name={countries[key].name}
                    controller='countries'/>
                <div className='cities'>{countries[key].cities}</div>
            </div>;
        });
        return countries;
    }

    load(e) {
        if((e !== undefined && e.keyCode == 46) ||
            e === undefined)
        this.getCountries()
            .then(this.fillCountriesWithCities)
            .then(this.mapCitiesToReact)
            .then(this.mapCountriesToReact)
            .then(countries => this.setState({countries}));
    }

    componentDidMount() {
        this.load();
    }

    render() {
        return <div onKeyDown={this.onKeyDown}>
            {Object.values(this.state.countries)}
        </div>;
    }
}