import * as types from '../constants/creating';

export function addCountry(name) {
    return {
        type: types.ADD_COUNTRY,
        name,
    };
}

export function addCity(name, countryId) {
    return {
        type: types.ADD_CITY,
        name,
        countryId,
    };
}