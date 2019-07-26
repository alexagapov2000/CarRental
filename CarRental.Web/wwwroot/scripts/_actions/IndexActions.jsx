import { store } from '../_store/configureStore.jsx';
import Axios from 'axios';

export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';

export const LOAD_CITIES = 'LOAD_CITIES';
export const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS';

export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const AUTHORIZE_USER_SUCCESS = 'AUTHORIZE_USER_SUCCESS';
export const AUTHORIZE_USER_FAILED = 'AUTHORIZE_USER_FAILED';

export const REMEMBER_USER = 'REMEMBER_USER';
export const REAUTHORIZE_USER = 'REAUTHORIZE_USER';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';
export const SIGN_UP_USER_FAILED = 'SIGN_UP_USER_FAILED';

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
        dispatch({
            type: AUTHORIZE_USER,
        });
        let dispatchSuccess = accountData => dispatch({
            type: AUTHORIZE_USER_SUCCESS,
            payload: accountData,
        });
        let dispatchFailed = response => dispatch({
            type: AUTHORIZE_USER_FAILED,
            payload: response.response.data.Message,
        });
        let accountData = {
            username: username,
            password: password,
        };
        await Axios.post("api/account/token", accountData)
            .then(response => accountData.token = response.data.jwtKey)
            .then(() => dispatchSuccess(accountData))
            .catch(dispatchFailed);
    };
}

export function saveUser() {
    return dispatch => {
        let token = store.getState().common.account.token;
        localStorage.setItem('token', token);
        dispatch({
            type: REMEMBER_USER,
        });
    }
}

export function reAuthUser() {
    return dispatch => {
        let token = localStorage.getItem('token');
        if (!token) return;
        let actionCreator = () => dispatch({
            type: REAUTHORIZE_USER,
            payload: {
                username: '',
                password: '',
                token,
            },
        });
        Axios.post('api/account/decode', null, { headers: { jwt: token } })
            .then(actionCreator());
    };
}

export function signUpUser(username, password1, password2) {
    return async dispatch => {
        dispatch({
            type: SIGN_UP_USER,
        });
        let dispatchSuccess = response => dispatch({
            type: SIGN_UP_USER_SUCCESS,
            payload: response.data,
        });
        let dispatchFailed = () => dispatch({
            type: SIGN_UP_USER_FAILED,
        });
        if (password1 != password2) {
            dispatchFailed();
            return;
        }
        await Axios.post('api/account/register', { username, password: password1 })
            .then(dispatchSuccess)
            .catch(dispatchFailed);
    };
}