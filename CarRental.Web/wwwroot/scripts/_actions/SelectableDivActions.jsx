import Axios from 'axios';

export const SWITCH_STATE = 'SWITCH_STATE';

export function switchState(isSelected) {
    return dispatch => {
        let isSelectedNow = !isSelected;
        dispatch({
            type: SWITCH_STATE,
            payload: {
                isSelected: isSelectedNow,
                className: isSelectedNow ? 'selected' : 'unselected',
            }
        });
    };
}