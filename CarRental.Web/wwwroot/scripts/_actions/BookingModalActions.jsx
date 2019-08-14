import Axios from 'axios';

export const SUBMIT_PURCHASE = 'SUBMIT_PURCHASE';
export const SUBMIT_PURCHASE_SUCCESS = 'SUBMIT_PURCHASE_SUCCESS';
export const SUBMIT_PURCHASE_SUCCESS_PAUSE = 'SUBMIT_PURCHASE_SUCCESS_PAUSE';
export const SUBMIT_PURCHASE_SUCCESS_PAUSE_FINISH = 'SUBMIT_PURCHASE_SUCCESS_PAUSE_FINISH';
export const SUBMIT_PURCHASE_FAILED = 'SUBMIT_PURCHASE_FAILED';

export function submitPurchase(username, carID, bookedFrom, bookedTo) {
    return async dispatch => {
        dispatch({
            type: SUBMIT_PURCHASE,
        });
        let dispatchSuccess = isOrderWasMade => dispatch({
            type: SUBMIT_PURCHASE_SUCCESS,
            payload: isOrderWasMade,
        });
        let dispatchSuccessPause = () => dispatch({
            type: SUBMIT_PURCHASE_SUCCESS_PAUSE,
            payload: true,
        });
        let dispatchSuccessPauseFinish = () => dispatch({
            type: SUBMIT_PURCHASE_SUCCESS_PAUSE_FINISH,
            payload: false,
        });
        let dispatchFailed = payload => dispatch({
            type: SUBMIT_PURCHASE_FAILED,
            payload: {
                isOrderWasMade: false,
                dangerMessage: payload,
            },
        });
        await Axios.post(`/api/cars/submit`, { username, carID, bookedFrom, bookedTo })
            .then(x => dispatchSuccess(x))
            .then(async () => {
                dispatchSuccessPause();
                await new Promise(resolve => setTimeout(resolve, 1500));
                dispatchSuccessPauseFinish();
            })
            .catch(x => {
                dispatchFailed(x.response.data.Message);
                throw x.response.data.Message
            });
    };
}