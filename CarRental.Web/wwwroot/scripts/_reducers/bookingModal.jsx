import * as types from '../_actions/BookingModalActions.jsx';

const initialState = {
    isOrderWasMade: true,
    dangerMessage: null,
    isPausedAfterSubmitting: false,
    isFetching: false,
};

export default function submitPurchaseReducer(state = initialState, action) {
    switch (action.type) {
        case types.SUBMIT_PURCHASE:
            return { ...state, isFetching: true };
        case types.SUBMIT_PURCHASE_SUCCESS:
            return { ...state, isOrderWasMade: action.payload.data, isFetching: false };
        case types.SUBMIT_PURCHASE_SUCCESS_PAUSE:
            return {...state, isPausedAfterSubmitting: action.payload};
        case types.SUBMIT_PURCHASE_SUCCESS_PAUSE_FINISH:
            return {...state, isPausedAfterSubmitting: action.payload};
        case types.SUBMIT_PURCHASE_FAILED:
            return { ...state, ...action.payload, isFetching: false };

        default:
            return state;
    }
}