import Axios from 'axios';

export const LOAD_CARS = 'LOAD_CARS';
export const LOAD_CARS_SUCCESS = 'LOAD_CARS_SUCCESS';
export const LOAD_CARS_FAILED = 'LOAD_CARS_FAILED';

export function loadCars(cityId) {
    return async dispatch => {
        dispatch({
            type: LOAD_CARS,
        });
        let dispatchSuccess = cars => dispatch({
            type: LOAD_CARS_SUCCESS,
            payload: cars,
        });
        let dispatchFailed = message => dispatch({
            type: LOAD_CARS_FAILED,
        });
        await Axios.get(`/api/cars?cityId=${cityId}`)
            .then(response => dispatchSuccess(response.data));
    };
}