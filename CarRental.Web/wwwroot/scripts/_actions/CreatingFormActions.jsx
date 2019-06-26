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

export function loadCountries() {
    return dispatch => {
        dispatch({
            type: LOAD_COUNTRIES,
        });
        getCountries()
            .then(countries => {
                dispatch({
                    type: LOAD_COUNTRIES_SUCCESS,
                    payload: countries,
                });
            });
    }
}

export function createCountry(name) {
    return async dispatch => {
        dispatch({
            type: CREATE_COUNTRY,
        });
        await Axios.post('api/countries', {name})
            .then(x => {
                dispatch({
                    type: CREATE_COUNTRY_SUCCESS,
                });
            });
    }
}