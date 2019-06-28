import * as types from '../_actions/SelectableDivActions.jsx';

const initialState = {
    isSelected: false,
    className: 'unselected',
};

export default function selectableDivReducer(state = initialState, action) {
    switch (action.type) {
        case types.SWITCH_STATE:
            return {
                ...state,
                isSelected: action.payload.isSelected,
                className: action.payload.className,
            }
    }
}