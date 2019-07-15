import Axios from 'axios';
import { store } from '../_store/configureStore.jsx';

export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
export const LOAD_CITIES = 'LOAD_CITIES';
export const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS';
export const DELETE_SEVERAL_OBJECTS = 'DELETE_SEVERAL_OBJECTS';
export const DELETE_SEVERAL_OBJECTS_SUCCESS = 'DELETE_SEVERAL_OBJECTS_SUCCESS';

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
        let token = store.getState().authForm.token;
        await fetch(`api/cities`, {headers: {Authorization: `bearer ${token}`}})
            .then(x => x.json())
            .then(cities => {
                dispatch({
                    type: LOAD_CITIES_SUCCESS,
                    payload: cities,
                });
            });
    };
}

export function deleteSeveralObjects(controller, IDs) {
    return async dispatch => {
        dispatch({
            type: DELETE_SEVERAL_OBJECTS,
        });
        await Axios.delete(`api/${controller}/delete`, IDs);
        dispatch({
            type: DELETE_SEVERAL_OBJECTS_SUCCESS,
        });
    };
}