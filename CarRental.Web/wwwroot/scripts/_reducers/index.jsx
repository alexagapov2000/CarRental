import { combineReducers } from 'redux';
import creatingFormReducer from '../_reducers/creatingForm.jsx';
import selectsReducer from '../_reducers/selects.jsx';
import locationsTableReducer from './locationsTable.jsx';

export const rootReducer = combineReducers({
  creatingForm: creatingFormReducer,
  selects: selectsReducer,
  locationsTable: locationsTableReducer,
});
