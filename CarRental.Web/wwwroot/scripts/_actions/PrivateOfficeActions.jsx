import Axios from 'axios';
import {store} from '../_store/configureStore.jsx';

export const DELETE_ORDER = 'DELETE_ORDER';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_FAILED = 'DELETE_ORDER_FAILED';

export const LOAD_ORDERS = 'LOAD_ORDERS';
export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_ORDERS_FAILED = 'LOAD_ORDERS_FAILED';

export function deleteOrder(id) {
    return async dispatch => {
        dispatch({
            type: DELETE_ORDER,
        });
        let dispatchSuccess = () => dispatch({
            type: DELETE_ORDER_SUCCESS,
        });
        let dispatchFailed = message => dispatch({
            type: DELETE_ORDER_FAILED,
            payload: message,
        });
        await Axios.delete(`api/cars`, id)
            .then(dispatchSuccess)
            .catch(x => {
                dispatchFailed(x.response.data.Message);
                throw x.response.data.Message;
            });
    };
}

export function loadOrders(username) {
    return async dispatch => {
        dispatch({
            type: LOAD_ORDERS,
        });
        let dispatchSuccess = orders => dispatch({
            type: LOAD_ORDERS_SUCCESS,
            payload: orders,
        });
        let dispatchFailed = message => dispatch({
            type: LOAD_ORDERS_FAILED,
            payload: message,
        });
        await Axios.post(`api/cars/byPerson`, { username })
            .then(x => dispatchSuccess(x.data))
            .catch(x => {
                console.log(x.response.data.Message)
                throw x.response.data.Message;
            });
    };
}