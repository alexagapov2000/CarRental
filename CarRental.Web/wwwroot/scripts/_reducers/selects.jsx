import * as types from '../_actions/SelectsActions.jsx';

const initialState = {
    countries: [],
    cities: [],
    filteredCities: [],
    isFetching: false,
};

export default function selectsReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_COUNTRIES:
            return {...state, isFetching: true};

        case types.LOAD_COUNTRIES_SUCCESS:
            return {...state, countries: action.payload, isFetching: false};

        case types.LOAD_CITIES:
            return {...state, isFetching: true};

        case types.LOAD_CITIES_SUCCESS:
            return {...state, cities: action.payload, isFetching: false};

        case types.FILTER_CITIES:
            return {...state, filteredCities: action.payload, isFetching: false};

        default:
            return state;
    }
}