import { combineReducers } from 'redux';
import creatingFormReducer from './creatingForm.jsx';
import selectsReducer from './selects.jsx';
import locationsTableReducer from './locationsTable.jsx';
import * as types from '../_actions/IndexActions.jsx';

const initialState = {
	countries: [],
	cities: [],
	account: {
		username: '',
		password: '',
		token: '',
	},
};

export function commonReducer(state = initialState, action) {
	switch (action.type) {
		case types.LOAD_COUNTRIES:
			return { ...state, countries: action.payload, isFetching: true };

		case types.LOAD_COUNTRIES_SUCCESS:
			return { ...state, countries: action.payload, isFetching: false };

		case types.LOAD_CITIES:
			return { ...state, cities: action.payload, isFetching: true };

		case types.LOAD_CITIES_SUCCESS:
			return { ...state, cities: action.payload, isFetching: false };

		case types.AUTHORIZE_USER:
			return { ...state, account: action.payload, isFetching: true };

		case types.SAVE_USER:
			return { ...state, isFetching: true };

		case types.REAUTHORIZE_USER:
			return { ...state, account: action.payload, isFetching: true };

		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	common: commonReducer,
	creatingForm: creatingFormReducer,
	selects: selectsReducer,
	locationsTable: locationsTableReducer,
	//authForm: authFormReducer,
});