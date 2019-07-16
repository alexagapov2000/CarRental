import { store } from '../_store/configureStore.jsx';

export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
export const LOAD_CITIES = 'LOAD_CITIES';
export const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS';
export const FILTER_CITIES = 'FILTER_CITIES';

export function loadCountries() {
    return async dispatch => {
        dispatch({
            type: LOAD_COUNTRIES,
            payload: [],
        });
        await fetch('api/countries')
            .then(x => x.json())
            .then(countries => {
                dispatch({
                    type: LOAD_COUNTRIES_SUCCESS,
                    payload: countries,
                });
            });
    };
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

export function filterCities(event) {
    return dispatch => {
        let cities = store.getState().selects.cities;
        let countries = store.getState().selects.countries;
        let choosenCountry = countries[event.target.selectedIndex];
        let filteredCities = cities.filter(x => x.countryId == choosenCountry.id);
        dispatch({
            type: FILTER_CITIES,
            payload: filteredCities,
        });
    };
}