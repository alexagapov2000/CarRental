import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../_reducers/index.jsx';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
