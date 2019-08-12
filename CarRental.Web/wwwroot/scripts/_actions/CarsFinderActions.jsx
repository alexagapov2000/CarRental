import Axios from 'axios';

export const LOAD_CARS = 'LOAD_CARS';
export const LOAD_CARS_SUCCESS = 'LOAD_CARS_SUCCESS';
export const LOAD_CARS_FAILED = 'LOAD_CARS_FAILED';

export function loadCars(
    cityId,
    bookedFrom, bookedTo,
    pageNumber = 0, pageSize = 1000,
    isDescendingSort = false, orderbyPropertyName = 'price') {
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
        await Axios.post(`/api/cars?pageNumber=${pageNumber}&pageSize=${pageSize}&isDescendingSort=${isDescendingSort}&orderbyPropertyName=${orderbyPropertyName}`, {
            cityId,
            bookedFrom: new Date(bookedFrom.setUTCHours(12, 0, 0, 0)),
            bookedTo : new Date(bookedTo.setUTCHours(12, 0, 0, 0)),
        })
            .then(response => dispatchSuccess(response.data));
    };
}