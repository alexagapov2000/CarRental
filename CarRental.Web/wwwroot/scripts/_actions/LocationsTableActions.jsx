import Axios from 'axios';

export const DELETE_SEVERAL_OBJECTS = 'DELETE_SEVERAL_OBJECTS';
export const DELETE_SEVERAL_OBJECTS_SUCCESS = 'DELETE_SEVERAL_OBJECTS_SUCCESS';

export function deleteSeveralObjects(controller, IDs) {
    return async dispatch => {
        dispatch({
            type: DELETE_SEVERAL_OBJECTS,
        });
        await Axios.delete(`api/${controller}`, {data: IDs});
        dispatch({
            type: DELETE_SEVERAL_OBJECTS_SUCCESS,
            payload: {countries: {}, cities: {}},
        });
    };
}