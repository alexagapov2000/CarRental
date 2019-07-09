import * as types from '../_actions/AuthFormActions.jsx';

const initialState = {
    username: '',
    password: '',
}

export default function authFormReducer(state = initialState, action) {
    switch (action.type) {
        case types.AUTHORIZE_USER:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                isFetching: true,
            }
        default:
            return state;
    }
}