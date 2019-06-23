import * as types from '../_actions/CreatingFormActions.jsx';

const initialState = {
    countries: [],
    cities: [],
    isFetching: false,
};

export default function creatingFormReducer(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_COUNTRY:
            return {...state, isFetching: true};

        case types.CREATE_COUNTRY_SUCCESS:
            return {...state, isFetching: false};

        case types.CREATE_CITY:
            return {...state, cities: action.payload, isFetching: true};

        case types.LOAD_COUNTRIES:
            return {...state, isFetching: true};

        case types.LOAD_COUNTRIES_SUCCESS:
            return {...state, countries: action.payload, isFetching: false};

        case types.MAP_COUNTRIES_TO_OPTIONS:
            return {...state, countries: action.payload, isFetching: false};

        default:
            return state;
    }
}