import * as types from '../_actions/CreatingFormActions.jsx';

const initialState = {
    countries: [],
    cities: [],
};

export default function creatingFormReducer(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_COUNTRY:
            return {...state, countries: action.payload, isFetching: true};
        case types.CREATE_CITY:
            return {...state, cities: action.payload, isFetching: true};
        default:
            return state;
    }
}