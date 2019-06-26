import { combineReducers } from 'redux';
import creatingFormReducer from '../_reducers/creatingForm.jsx';
import selectsReducer from '../_reducers/selects.jsx';

export const rootReducer = combineReducers({
  creatingForm: creatingFormReducer,
  selects: selectsReducer,
});
