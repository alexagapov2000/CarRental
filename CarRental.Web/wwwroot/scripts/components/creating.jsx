import React from 'react';

export default class CreatingComponent extends React.Component {

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
        </div>;
    }
}