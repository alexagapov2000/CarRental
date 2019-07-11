import Axios from 'axios';

export const AUTHORIZE_USER = 'AUTHORIZE_USER';

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