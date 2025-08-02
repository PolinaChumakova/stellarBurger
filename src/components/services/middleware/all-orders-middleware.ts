import { Middleware, MiddlewareAPI } from 'redux';
import {
	AppActions,
	AppDispatch,
	RootState,
	TWSAllStoreActions,
} from '@/utils/types';

export const allOrdersMiddleware = (
	wsUrl: string,
	wsActions: TWSAllStoreActions
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AppActions) => {
			const { dispatch } = store;
			const { type } = action;
			const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

			if (type === wsInit) {
				socket = new WebSocket(wsUrl);
			}

			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					const parsedData = JSON.parse(event.data);
					dispatch({ type: onMessage, payload: parsedData });
				};

				socket.onclose = (event) => {
					dispatch({ type: onClose, payload: event });
				};
			}

			return next(action);
		};
	}) as Middleware;
};
