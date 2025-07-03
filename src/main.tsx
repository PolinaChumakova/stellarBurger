import React from 'react';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import { App } from '@components/app/app.tsx';

// @ts-expect-error Could not find a declaration file
import { rootReducer } from '@/components/services/reducers';

interface WindowWithReduxDevtools extends Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

const composeEnhancers =
	(typeof window === 'object' &&
		(window as WindowWithReduxDevtools).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
);
