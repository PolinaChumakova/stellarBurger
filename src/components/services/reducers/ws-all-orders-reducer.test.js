import { describe, expect, it } from 'vitest';
import {
	WS_ALL_CONNECTION_CLOSED,
	WS_ALL_CONNECTION_ERROR,
	WS_ALL_CONNECTION_SUCCESS,
	WS_GET_ALL_ORDERS,
} from '../actions/ws-actions';
import {
	wsAllOrdersReducer,
	initialStateWsAllOrders,
} from './ws-all-orders-reducer';

describe('wsAllOrdersReducer', () => {
	it('должен возвращать initialState по умолчанию', () => {
		const state = wsAllOrdersReducer(undefined, { type: '' });
		expect(state).toEqual(initialStateWsAllOrders);
	});

	it('обрабатывает WS_ALL_CONNECTION_SUCCESS', () => {
		const action = { type: WS_ALL_CONNECTION_SUCCESS };
		const state = wsAllOrdersReducer(initialStateWsAllOrders, action);
		expect(state).toEqual({
			...initialStateWsAllOrders,
			wsConnected: true,
			error: undefined,
		});
	});

	it('обрабатывает WS_ALL_CONNECTION_ERROR', () => {
		const action = {
			type: WS_ALL_CONNECTION_ERROR,
			payload: 'Connection failed',
		};
		const state = wsAllOrdersReducer(
			{ ...initialStateWsAllOrders, wsConnected: true },
			action
		);
		expect(state).toEqual({
			...initialStateWsAllOrders,
			wsConnected: false,
			error: 'Connection failed',
		});
	});

	it('обрабатывает WS_ALL_CONNECTION_CLOSED', () => {
		const action = { type: WS_ALL_CONNECTION_CLOSED };
		const state = wsAllOrdersReducer(
			{ ...initialStateWsAllOrders, wsConnected: true },
			action
		);
		expect(state).toEqual({
			...initialStateWsAllOrders,
			wsConnected: false,
		});
	});

	it('обрабатывает WS_GET_ALL_ORDERS', () => {
		const action = {
			type: WS_GET_ALL_ORDERS,
			payload: {
				orders: [{ _id: '1', number: 100, ingredients: [], status: 'done' }],
				total: 2000,
				totalToday: 150,
			},
		};
		const state = wsAllOrdersReducer(initialStateWsAllOrders, action);
		expect(state).toEqual({
			...initialStateWsAllOrders,
			orders: action.payload.orders,
			total: 2000,
			totalToday: 150,
		});
	});
});
