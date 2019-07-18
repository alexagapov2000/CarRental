export const SWITCH_STATE = 'SWITCH_STATE';

export function switchState(isSelected) {
    return dispatch => {
        let isSelectedNew = !isSelected;
        dispatch({
            type: SWITCH_STATE,
            payload: isSelectedNew,
        });
    };
}