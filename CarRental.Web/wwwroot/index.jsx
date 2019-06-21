import React from 'react';
import { render } from 'react-dom';
import App from './scripts/app.jsx';
import { Provider } from 'react-redux';
import { store } from './scripts/_store/configureStore.jsx';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
)