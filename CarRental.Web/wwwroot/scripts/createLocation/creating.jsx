import React from 'react';
import Axios from 'axios';
import CountrySelect from '../chooseLocation/countrySelect.jsx';

export default class Creating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countryID: 1,
        };
        this.setCountryID = this.setCountryID.bind(this);
        this.addCity = this.addCity.bind(this);
        this.addCountry = this.addCountry.bind(this);
    }

    addCountry(e) {
        if(e.keyCode == 13) {
            Axios.post('api/countries', {name: e.target.value});
            e.target.value = '';
        }
    }

    addCity(e) {
        if(e.keyCode == 13) {
            Axios.post('api/cities', {
                name: e.target.value,
                countryID: this.state.countryID});
            e.target.value = '';
        }
    }

    setCountryID(e) {
        this.setState({countryID: e.target.value});
    }

    render() {
        return <div>
            <fieldset className='country-creating'>
                <legend>Country creating form</legend>
                <input type='text' onKeyDown={this.addCountry} placeholder='Enter the new country'/>
            </fieldset>
            <fieldset className='city-creating'>
                <legend>City creating form</legend>
                <CountrySelect
                    onChange={this.setCountryID}
                    controller='api/countries'/>
                <input type="text" onKeyDown={this.addCity} placeholder='Enter the new city'/>
            </fieldset>
        </div>
    };
}