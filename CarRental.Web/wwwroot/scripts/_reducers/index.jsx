import { combineReducers } from 'redux';
import creatingFormReducer from './creatingForm.jsx';
import selectsReducer from './selects.jsx';
import locationsTableReducer from './locationsTable.jsx';
import authFormReducer from './authForm.jsx';

export const rootReducer = combineReducers({
  creatingForm: creatingFormReducer,
  selects: selectsReducer,
  locationsTable: locationsTableReducer,
  authForm: authFormReducer,
});