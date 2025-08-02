import { IOrder } from '@/utils/types';
import {
	TWsActions,
	WS_GET_USER_ORDERS,
	WS_USER_CONNECTION_CLOSED,
	WS_USER_CONNECTION_ERROR,
	WS_USER_CONNECTION_SUCCESS,
} from '../actions/ws-actions';

interface IWSState {
	wsConnected: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
	error?: string;
}

export const initialStateWsUserOrders: IWSState = {
	wsConnected: false,
	orders: [],
	total: 0,
	totalToday: 0,
	error: undefined,
};

export const wsUserOrdersReducer = (
	state = initialStateWsUserOrders,
	action: TWsActions
): IWSState => {
	switch (action.type) {
		case WS_USER_CONNECTION_SUCCESS:
			return { ...state, wsConnected: true, error: undefined };

		case WS_USER_CONNECTION_ERROR:
			return { ...state, wsConnected: false, error: action.payload };

		case WS_USER_CONNECTION_CLOSED:
			return { ...state, wsConnected: false };

		case WS_GET_USER_ORDERS:
			return {
				...state,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};

		default:
			return state;
	}
};
