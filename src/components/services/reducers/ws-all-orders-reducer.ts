import { IOrder } from '@/utils/types';
import {
	TWsActions,
	WS_ALL_CONNECTION_CLOSED,
	WS_ALL_CONNECTION_ERROR,
	WS_ALL_CONNECTION_SUCCESS,
	WS_GET_ALL_ORDERS,
} from '../actions/ws-actions';

interface IWSState {
	wsConnected: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
	error?: string;
}

const initialState: IWSState = {
	wsConnected: false,
	orders: [],
	total: 0,
	totalToday: 0,
	error: undefined,
};

export const wsAllOrdersReducer = (
	state = initialState,
	action: TWsActions
): IWSState => {
	switch (action.type) {
		case WS_ALL_CONNECTION_SUCCESS:
			return { ...state, wsConnected: true, error: undefined };

		case WS_ALL_CONNECTION_ERROR:
			return { ...state, wsConnected: false, error: action.payload };

		case WS_ALL_CONNECTION_CLOSED:
			return { ...state, wsConnected: false };

		case WS_GET_ALL_ORDERS:
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
