import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureMyStore from './store/confStore';

import App from './components/app';

export const store = configureMyStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
