import Axios from 'axios';

export const CREATE_COUNTRY = 'CREATE_COUNTRY';
export const CREATE_CITY = 'CREATE_CITY';

function postCountry(name) {
    Axios.post('api/countries', {name});
}

function loadCountries(countries) {
    fetch('api/countries')
        .then(x => x.json())
        .then(x => countries.push(x));
}

export function createCountry(name) {
    return dispatch => {
        let countries = [];
        postCountry(name);
        loadCountries(countries);
        dispatch({
            type: CREATE_COUNTRY,
            payload: countries,
        });
    }
}