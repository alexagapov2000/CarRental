import * as types from '../_actions/PrivateOfficeActions.jsx';

const initialState = {
    orders: [],
    dangerMessage: null,
    isFetching: false,
};

export default function privateOfficeReducer(state = initialState, action) {
    switch (action.type) {
        case types.DELETE_ORDER:
            return state;
        case types.DELETE_ORDER_SUCCESS:
            return state;
        case types.DELETE_ORDER_FAILED:
            return { ...state, dangerMessage: action.payload };

        case types.LOAD_ORDERS:
            return state;
        case types.LOAD_ORDERS_SUCCESS:
            return { ...state, orders: action.payload };
        case types.LOAD_ORDERS_FAILED:
            return { ...state, dangerMessage: action.payload };

        default:
            return state;
    }
}