import { combineReducers } from 'redux';
import creatingFormReducer from './creatingForm.jsx';
import selectsReducer from './selects.jsx';
import locationsTableReducer from './locationsTable.jsx';
import carsFinderReducer from './carsFinder.jsx';
import bookingModalReducer from './bookingModal.jsx';
import privateOfficeReducer from './privateOffice.jsx';
import * as types from '../_actions/IndexActions.jsx';

const initialState = {
	countries: [],
	cities: [],
	account: null,
	isFetching: false,
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
			return { ...state, isFetching: true };
		case types.AUTHORIZE_USER_SUCCESS:
			return { ...state, account: action.payload, isFetching: false };
		case types.AUTHORIZE_USER_FAILED:
			return { ...state, account: undefined, badResponse: action.payload, isFetching: false };

		case types.REMEMBER_USER:
			return { ...state, isFetching: false };

		case types.REAUTHORIZE_USER:
			return { ...state, account: action.payload, isFetching: false };

		case types.SIGN_UP_USER:
			return { ...state, isFetching: true };
		case types.SIGN_UP_USER_SUCCESS:
			return { ...state, account: action.payload, isFetching: false };
		case types.SIGN_UP_USER_FAILED:
			return { ...state, isFetching: false };

		case types.EXIT:
			return {...state, account: action.payload};

		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	common: commonReducer,
	creatingForm: creatingFormReducer,
	selects: selectsReducer,
	locationsTable: locationsTableReducer,
	carsFinder: carsFinderReducer,
	bookingModal: bookingModalReducer,
	privateOffice: privateOfficeReducer,
});