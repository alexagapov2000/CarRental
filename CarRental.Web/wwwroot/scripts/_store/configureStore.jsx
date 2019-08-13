import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../_reducers/index.jsx';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
/*
export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
*/
export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
