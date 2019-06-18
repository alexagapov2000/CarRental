import * as types from '../constants/creating.jsx';

export function addCountry(name) {
    return {
        type: types.ADD_COUNTRY,
        name,
    };
}

export function addCity(name) {
    return {
        type: types.ADD_CITY,
        name,
    };
}