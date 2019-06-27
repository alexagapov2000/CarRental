import Axios from 'axios';

export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
export const LOAD_CITIES = 'LOAD_CITIES';
export const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS';
export const DELETE_COUNTRY = 'DELETE_COUNTRY';
export const DELETE_COUNTRY_SUCCESS = 'DELETE_COUNTRY_SUCCESS';
export const DELETE_CITY = 'DELETE_CITY';
export const DELETE_CITY_SUCCESS = 'DELETE_CITY_SUCCESS';

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

export function loadCities() {
    return async dispatch => {
        dispatch({
            type: LOAD_CITIES,
        });
        await fetch(`api/cities`)
            .then(x => x.json())
            .then(cities => {
                dispatch({
                    type: LOAD_CITIES_SUCCESS,
                    payload: cities,
                });
            });
    };
}

function deleteObject(controller, id, fetchingActionType, readyActionType) {
    return async dispatch => {
        dispatch({
            type: fetchingActionType,
        });
        await Axios.delete(`api/${controller}/${id}`)
            .then(x => {
                dispatch({
                    type: readyActionType,
                });
            });
    };
}

export function deleteCountry(id) {
    return deleteObject('countries', id, DELETE_COUNTRY, DELETE_COUNTRY_SUCCESS);
}

export function deleteCity(id) {
    return deleteObject('cities', id, DELETE_CITY, DELETE_CITY_SUCCESS);
}