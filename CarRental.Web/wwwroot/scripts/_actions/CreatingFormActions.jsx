import Axios from 'axios';

export const CREATE_COUNTRY = 'CREATE_COUNTRY';
export const CREATE_COUNTRY_SUCCESS = 'CREATE_COUNTRY_SUCCESS';
export const CREATE_CITY = 'CREATE_CITY';
export const CREATE_CITY_SUCCESS = 'CREATE_CITY_SUCCESS';
export const CHANGE_COUNTRY = 'CHANGE_COUNTRY';

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

export function changeCountry(newCountry) {
    return dispatch => {
        dispatch({
            type: CHANGE_COUNTRY,
            payload: newCountry,
        });
    };
}