import React from 'react';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import { App } from '@components/app/app.tsx';
import { rootReducer } from './components/services/reducers';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, undefined, enhancer);

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
);
