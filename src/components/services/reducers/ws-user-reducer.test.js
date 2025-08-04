import { describe, expect, it } from 'vitest';
import {
	WS_USER_CONNECTION_SUCCESS,
	WS_USER_CONNECTION_ERROR,
	WS_USER_CONNECTION_CLOSED,
	WS_GET_USER_ORDERS,
} from '../actions/ws-actions';

import {
	wsUserOrdersReducer,
	initialStateWsUserOrders,
} from './ws-user-reducer';

describe('wsUserOrdersReducer', () => {
	it('должен возвращать initialState по умолчанию', () => {
		const state = wsUserOrdersReducer(undefined, { type: '' });
		expect(state).toEqual(initialStateWsUserOrders);
	});

	it('обрабатывает WS_USER_CONNECTION_SUCCESS', () => {
		const action = { type: WS_USER_CONNECTION_SUCCESS };
		const state = wsUserOrdersReducer(initialStateWsUserOrders, action);
		expect(state).toEqual({
			...initialStateWsUserOrders,
			wsConnected: true,
			error: undefined,
		});
	});

	it('обрабатывает WS_USER_CONNECTION_ERROR', () => {
		const action = {
			type: WS_USER_CONNECTION_ERROR,
			payload: 'Auth error',
		};
		const state = wsUserOrdersReducer(
			{ ...initialStateWsUserOrders, wsConnected: true },
			action
		);
		expect(state).toEqual({
			...initialStateWsUserOrders,
			wsConnected: false,
			error: 'Auth error',
		});
	});

	it('обрабатывает WS_USER_CONNECTION_CLOSED', () => {
		const action = { type: WS_USER_CONNECTION_CLOSED };
		const state = wsUserOrdersReducer(
			{ ...initialStateWsUserOrders, wsConnected: true },
			action
		);
		expect(state).toEqual({
			...initialStateWsUserOrders,
			wsConnected: false,
		});
	});

	it('обрабатывает WS_GET_USER_ORDERS', () => {
		const action = {
			type: WS_GET_USER_ORDERS,
			payload: {
				orders: [
					{ _id: 'abc123', number: 1001, ingredients: [], status: 'done' },
				],
				total: 1234,
				totalToday: 56,
			},
		};
		const state = wsUserOrdersReducer(initialStateWsUserOrders, action);
		expect(state).toEqual({
			...initialStateWsUserOrders,
			orders: action.payload.orders,
			total: 1234,
			totalToday: 56,
		});
	});
});
