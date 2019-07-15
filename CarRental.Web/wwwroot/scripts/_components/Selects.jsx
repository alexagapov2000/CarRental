import React from 'react';

export default class Selects extends React.Component {

    mapCountriesToOptions = countries => {
        return countries.map(x => {
            return <option key={x.id}>{x.name}</option>;
        });
    }

    mapCitiesToOptions = cities => {
        return (cities || []).map(x => {
            return <option key={x.id} countryId={x.countryId}>{x.name}</option>;
        });
    }

    componentDidMount() {
        this.props.loadCountries();
        this.props.loadCities();
    }
    
    render() {
        return <fieldset>
            <legend>Select location</legend>
            <select defaultValue='-1' onChange={this.props.filterCities}>
                {this.mapCountriesToOptions(this.props.countries)}
                <option value="-1">Choose country</option>
            </select>
            <select>
                {this.mapCitiesToOptions(this.props.filteredCities)}
            </select>
        </fieldset>;
    }
}