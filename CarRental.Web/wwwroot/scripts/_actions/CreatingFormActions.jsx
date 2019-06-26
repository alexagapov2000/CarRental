import Axios from 'axios';

export const CREATE_COUNTRY = 'CREATE_COUNTRY';
export const CREATE_COUNTRY_SUCCESS = 'CREATE_COUNTRY_SUCCESS';
export const CREATE_CITY = 'CREATE_CITY';
export const CREATE_CITY_SUCCESS = 'CREATE_CITY_SUCCESS';
export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';

export function loadCountries() {
    return async dispatch => {
        dispatch({
            type: LOAD_COUNTRIES,
        });
        await fetch('api/countries')
            .then(x => x.json())
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

export function createCity(name, countryId) {
    return async dispatch => {
        dispatch({
            type: CREATE_CITY,
        });
        await Axios.post(`api/cities`, {name, countryId})
            .then(x => {
                dispatch({
                    type: CREATE_CITY_SUCCESS,
                });
            });
    };
}