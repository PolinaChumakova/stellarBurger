import React from 'react';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { applyMiddleware, compose, createStore } from 'redux';
import { HashRouter as Router } from 'react-router-dom';

import './index.css';
import { App } from '@components/app/app.tsx';
import { rootReducer } from './components/services/reducers';
import { allOrdersMiddleware } from './components/services/middleware/all-orders-middleware';
import { TWSAllStoreActions, TWSUserStoreActions } from './utils/types';
import { userOrdersMiddleware } from './components/services/middleware/user-orders-middleware';
import {
	WS_ALL_CONNECTION_CLOSED,
	WS_ALL_CONNECTION_ERROR,
	WS_ALL_CONNECTION_START,
	WS_ALL_CONNECTION_SUCCESS,
	WS_GET_ALL_ORDERS,
	WS_GET_USER_ORDERS,
	WS_USER_CONNECTION_CLOSED,
	WS_USER_CONNECTION_ERROR,
	WS_USER_CONNECTION_START,
	WS_USER_CONNECTION_SUCCESS,
} from './components/services/actions/ws-actions';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsAllOrdersUrl: string = 'wss://norma.nomoreparties.space/orders/all';
const wsAllOrdersActions: TWSAllStoreActions = {
	wsInit: WS_ALL_CONNECTION_START,
	onOpen: WS_ALL_CONNECTION_SUCCESS,
	onClose: WS_ALL_CONNECTION_CLOSED,
	onError: WS_ALL_CONNECTION_ERROR,
	onMessage: WS_GET_ALL_ORDERS,
};

const wsUserOrdersUrl: string = 'wss://norma.nomoreparties.space/orders';
const wsUserOrdersActions: TWSUserStoreActions = {
	wsInit: WS_USER_CONNECTION_START,
	onOpen: WS_USER_CONNECTION_SUCCESS,
	onClose: WS_USER_CONNECTION_CLOSED,
	onError: WS_USER_CONNECTION_ERROR,
	onMessage: WS_GET_USER_ORDERS,
};

const enhancer = composeEnhancers(
	applyMiddleware(
		thunk,
		allOrdersMiddleware(wsAllOrdersUrl, wsAllOrdersActions),
		userOrdersMiddleware(wsUserOrdersUrl, wsUserOrdersActions)
	)
);

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
