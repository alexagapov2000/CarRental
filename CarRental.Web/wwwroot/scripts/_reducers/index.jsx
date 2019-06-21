import { combineReducers } from 'redux';
import creatingFormReducer from '../_reducers/creatingForm.jsx';

export const rootReducer = combineReducers({
  creatingForm: creatingFormReducer,
});
