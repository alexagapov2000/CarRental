import * as types from '../_actions/LocationsTableActions.jsx';

const initialState = {
    countries: [],
    cities: [],
    isFetching: false,
};

export default function locationsTableReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_COUNTRIES:
            return {...state, isFetching: true};

        case types.LOAD_COUNTRIES_SUCCESS:
            return {...state, countries: action.payload, isFetching: false};

        case types.LOAD_CITIES:
            return {...state, isFetching: true};

        case types.LOAD_CITIES_SUCCESS:
            return {...state, cities: action.payload, isFetching: false};

        case types.DELETE_COUNTRY:
            return {...state, isFetching: true};

        case types.DELETE_COUNTRY_SUCCESS:
            return {...state, isFetching: false};

        case types.DELETE_CITY:
            return {...state, isFetching: true};
        
        case types.DELETE_CITY_SUCCESS:
            return {...state, isFetching: false};

        default:
            return state;
    }
}