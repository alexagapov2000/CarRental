import { store } from '../_store/configureStore.jsx';
import Axios from 'axios';

export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
export const LOAD_CITIES = 'LOAD_CITIES';
export const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS';
export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const SAVE_USER = 'SAVE_USER';
export const REAUTHORIZE_USER = 'REAUTHORIZE_USER';

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
    }
}

export function loadCities() {
    return async dispatch => {
        dispatch({
            type: LOAD_CITIES,
            payload: [],
        });
        let token = store.getState().common.account.token;
        await fetch(`api/cities`, { headers: { Authorization: `bearer ${token}` } })
            .then(x => x.json())
            .then(cities => {
                dispatch({
                    type: LOAD_CITIES_SUCCESS,
                    payload: cities,
                });
            });
    };
}

export function authUser(username, password) {
    return async dispatch => {
        let accountData = {
            username: username,
            password: password,
        };
        let authData = await Axios.post("api/account/token", accountData);
        accountData.token = authData.data.JWTkey;
        dispatch({
            type: AUTHORIZE_USER,
            payload: accountData,
        });
    };
}

export function saveUser() {
    return dispatch => {
        let token = store.getState().common.account.token;
        localStorage.setItem('token', token);
        dispatch({
            type: SAVE_USER,
        });
    }
}

export function reAuthUser() {
    return async dispatch => {
        let token = localStorage.getItem('token');
        let person = await Axios.post('api/account/decode', null, { headers: { jwt: token } });
        console.log(person);

        dispatch({
            type: REAUTHORIZE_USER,
        });
    };
}