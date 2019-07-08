export const AUTHORIZE_USER = 'AUTHORIZE_USER';

export function authorizeUser() {
    return async dispatch => {
        
        dispatch({
            type: AUTHORIZE_USER,
            payload: authInfo,
        });
    };
}