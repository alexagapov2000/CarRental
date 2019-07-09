import Axios from 'axios';

export const AUTHORIZE_USER = 'AUTHORIZE_USER';

export function authUser(username, password) {
    return async dispatch => {
        let accountData = {
            Username: username,
            Password: password,
            Role: 'admin',
        };
        await Axios.post("api/account", accountData);
        dispatch({
            type: AUTHORIZE_USER,
            payload: accountData,
        });
    };
}