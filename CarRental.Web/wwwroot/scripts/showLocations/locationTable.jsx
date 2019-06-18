import React from 'react'
import SelectableComponent from './selectableComponent.jsx'

export default class LocationTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selectedItemsCount: 0,
            deletedItemsCount: 0,
        };
        this.getCountries = this.getCountries.bind(this);
        this.fillCountriesWithCities = this.fillCountriesWithCities.bind(this);
        this.mapCitiesToReact = this.mapCitiesToReact.bind(this);
        this.mapCountriesToReact = this.mapCountriesToReact.bind(this);
        this.load = this.load.bind(this);
        this.incrementDeletedItemsCount = this.incrementDeletedItemsCount.bind(this);
        this.changeSelectedItemsCount = this.changeSelectedItemsCount.bind(this);
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
                    incrementDeletedItemsCount={this.incrementDeletedItemsCount}
                    changeSelectedItemsCount={this.changeSelectedItemsCount}
                    id={c.id} name={c.name}
                    controller='cities'/>
            })});
        return countries;
    }

    mapCountriesToReact(countries) {
        Object.keys(countries).forEach(key => {
            countries[key] = <div className='countries-cities'>
                <SelectableComponent
                    incrementDeletedItemsCount={this.incrementDeletedItemsCount}
                    changeSelectedItemsCount={this.changeSelectedItemsCount}
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

    incrementDeletedItemsCount() {
        this.setState({deletedItemsCount: this.state.deletedItemsCount + 1});
    }

    changeSelectedItemsCount(difference) {
        this.setState({selectedItemsCount: this.state.selectedItemsCount + difference});
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('selectedItemsCount: ' + nextState.selectedItemsCount);
        console.log('deletedItemsCount: ' + nextState.deletedItemsCount);
        console.log(' ');
        if(nextState.selectedItemsCount == nextState.deletedItemsCount) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.load();
    }

    render() {
        return <div>
            <span>Choose locations and press 'Delete' to remove them</span>
            {Object.values(this.state.countries)}
        </div>;
    }
}