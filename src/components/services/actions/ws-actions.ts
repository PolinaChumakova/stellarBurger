import { IWSOrdersResponse } from '@/utils/types';

export const WS_ALL_CONNECTION_START = 'WS_ALL_CONNECTION_START' as const;
export const WS_ALL_CONNECTION_SUCCESS = 'WS_ALL_CONNECTION_SUCCESS' as const;
export const WS_ALL_CONNECTION_ERROR = 'WS_ALL_CONNECTION_ERROR' as const;
export const WS_ALL_CONNECTION_CLOSED = 'WS_ALL_CONNECTION_CLOSED' as const;
export const WS_GET_ALL_ORDERS = 'WS_GET_ALL_ORDERS' as const;
export const WS_ALL_CONNECTION_STOP = 'WS_ALL_CONNECTION_STOP' as const;

export const WS_USER_CONNECTION_START = 'WS_USER_CONNECTION_START' as const;
export const WS_USER_CONNECTION_SUCCESS = 'WS_USER_CONNECTION_SUCCESS' as const;
export const WS_USER_CONNECTION_ERROR = 'WS_USER_CONNECTION_ERROR' as const;
export const WS_USER_CONNECTION_CLOSED = 'WS_USER_CONNECTION_CLOSED' as const;
export const WS_GET_USER_ORDERS = 'WS_GET_USER_ORDERS' as const;
export const WS_USER_CONNECTION_STOP = 'WS_USER_CONNECTION_STOP' as const;

export const wsAllConnectionStart = () => ({ type: WS_ALL_CONNECTION_START });
export const wsAllConnectionStop = () => ({ type: WS_ALL_CONNECTION_STOP });

export const wsAllConnectionSuccess = () => ({
	type: WS_ALL_CONNECTION_SUCCESS,
});
export const wsAllConnectionError = (error: string) => ({
	type: WS_ALL_CONNECTION_ERROR,
	payload: error,
});
export const wsAllConnectionClosed = () => ({ type: WS_ALL_CONNECTION_CLOSED });

export const wsGetAllOrders = (data: IWSOrdersResponse) => ({
	type: WS_GET_ALL_ORDERS,
	payload: data,
});

export const wsUserConnectionStart = () => ({ type: WS_USER_CONNECTION_START });
export const wsUserConnectionStop = () => ({ type: WS_USER_CONNECTION_STOP });

export const wsUserConnectionSuccess = () => ({
	type: WS_USER_CONNECTION_SUCCESS,
});
export const wsUserConnectionError = (error: string) => ({
	type: WS_USER_CONNECTION_ERROR,
	payload: error,
});
export const wsUserConnectionClosed = () => ({
	type: WS_USER_CONNECTION_CLOSED,
});

export const wsGetUserOrders = (data: IWSOrdersResponse) => ({
	type: WS_GET_USER_ORDERS,
	payload: data,
});

export type TWsActions =
	| ReturnType<typeof wsAllConnectionStart>
	| ReturnType<typeof wsAllConnectionStop>
	| ReturnType<typeof wsAllConnectionSuccess>
	| ReturnType<typeof wsAllConnectionError>
	| ReturnType<typeof wsAllConnectionClosed>
	| ReturnType<typeof wsGetAllOrders>
	| ReturnType<typeof wsUserConnectionStart>
	| ReturnType<typeof wsUserConnectionStop>
	| ReturnType<typeof wsUserConnectionSuccess>
	| ReturnType<typeof wsUserConnectionError>
	| ReturnType<typeof wsUserConnectionClosed>
	| ReturnType<typeof wsGetUserOrders>;
