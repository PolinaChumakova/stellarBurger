import { Middleware, MiddlewareAPI } from 'redux';
import {
	AppActions,
	AppDispatch,
	RootState,
	TWSUserStoreActions,
} from '@/utils/types';

export const userOrdersMiddleware = (
	wsUrl: string,
	wsActions: TWSUserStoreActions
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AppActions) => {
			const { dispatch } = store;
			const { type } = action;
			const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

			if (type === wsInit) {
				const rawToken = localStorage.getItem('accessToken');
				const token = rawToken?.replace('Bearer ', '');

				const wsUrlWithToken = `${wsUrl}?token=${token}`;

				socket = new WebSocket(wsUrlWithToken);

				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					try {
						const parsedData = JSON.parse(event.data);

						if (parsedData?.message === 'Invalid or missing token') {
							dispatch({
								type: onError,
								payload: new Error('Token is invalid or expired'),
							});
							socket?.close();
							socket = null;
							return;
						}

						dispatch({ type: onMessage, payload: parsedData });
					} catch (err) {
						dispatch({ type: onError, payload: err });
					}
				};

				socket.onclose = (event) => {
					dispatch({ type: onClose, payload: event });
					socket = null;
				};
			}

			return next(action);
		};
	}) as Middleware;
};
