import * as types from '../_actions/CarsFinderActions.jsx';

const initialState = {
    cars: [],
    isFetching: false,
};

export default function carsFinderReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_CARS:
            return {...state, isFetching: true};
        case types.LOAD_CARS_SUCCESS:
            return {...state, cars: action.payload, isFetching: false};
        case types.LOAD_CARS_FAILED:
            return {...state, isFetching: false};

        default:
            return state;
    }
}