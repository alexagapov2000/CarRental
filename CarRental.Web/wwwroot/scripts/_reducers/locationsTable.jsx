import * as types from '../_actions/LocationsTableActions.jsx';

const initialState = {
    countries: [],
    cities: [],
    toDeleteList: {countries: {}, cities: {}},
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

        case types.DELETE_SEVERAL_OBJECTS:
            return {...state, isFetching: true};

        case types.DELETE_SEVERAL_OBJECTS_SUCCESS:
            return {...state, isFetching: false};

        default:
            return state;
    }
}