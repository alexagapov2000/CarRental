import React from 'react';
import Axios from 'axios';

export const CREATE_COUNTRY = 'CREATE_COUNTRY';
export const CREATE_COUNTRY_SUCCESS = 'CREATE_COUNTRY_SUCCESS';
export const CREATE_CITY = 'CREATE_CITY';
export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
export const MAP_COUNTRIES_TO_OPTIONS = 'MAP_COUNTRIES_TO_OPTIONS';

function getCountries() {
    return fetch('api/countries')
        .then(x => x.json());
}

export function createCountry(name) {
    return dispatch => {
        dispatch({
            type: CREATE_COUNTRY,
        });
        Axios.post('api/countries', {name});
        dispatch({
            type: CREATE_COUNTRY_SUCCESS,
        });
    }
}

export function loadCountries() {
    return dispatch => {
        dispatch({
            type: LOAD_COUNTRIES,
        });
        let countries = getCountries()
            .then(x => {
                dispatch({
                    type: LOAD_COUNTRIES_SUCCESS,
                    payload: countries,
                });
            });
        /*
        console.log(countries.length);
        countries = countries.map(x => {
            let tmp = <option key={x.id}>{x.name}</option>;
            console.log(tmp);
            return tmp;
        });
        dispatch({
            type: MAP_COUNTRIES_TO_OPTIONS,
            payload: countries,
        });
        console.log(countries);
        */
    }
}

export function mapCountriesToOptions(countriesAsObjs) {
    return dispatch => {
        let countriesAsOptions =
            countriesAsObjs.map(x => {
                return <option key={x.id}>{x.name}</option>;
        });
        dispatch({
            type: MAP_COUNTRIES_TO_OPTIONS,
            payload: countriesAsOptions,
        });
    }
}