import Axios from 'axios';

export const AUTHORIZE_USER = 'AUTHORIZE_USER';

export function authUser(username, password) {
    return async dispatch => {
        let accountData = {
            username: username,
            password: password,
        };
        await Axios.post("api/account/token", accountData);
        dispatch({
            type: AUTHORIZE_USER,
            payload: accountData,
        });
    };
}

export function getToken() {
    return async dispatch => {
        
    };
}