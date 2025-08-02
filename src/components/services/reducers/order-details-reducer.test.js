import { describe, expect, it } from 'vitest';
import {
	GET_ORDER_DETAILS_REQUEST,
	GET_ORDER_DETAILS_SUCCESS,
	GET_ORDER_DETAILS_FAILED,
	GET_ORDER_INGREDIENT_REQUEST,
	GET_ORDER_INGREDIENT_SUCCESS,
	GET_ORDER_INGREDIENT_FAILED,
} from '../actions';

import {
	orderDetailsReducer,
	initialStateOrderDetails,
} from './order-details-reducer';

describe('orderDetailsReducer', () => {
	it('должен вернуть initialStateOrderDetails по умолчанию', () => {
		const state = orderDetailsReducer(undefined, { type: '' });
		expect(state).toEqual(initialStateOrderDetails);
	});

	it('обрабатывает GET_ORDER_DETAILS_REQUEST', () => {
		const action = { type: GET_ORDER_DETAILS_REQUEST };
		const state = orderDetailsReducer(initialStateOrderDetails, action);
		expect(state).toEqual({
			...initialStateOrderDetails,
			orderDetailsRequest: true,
			orderDetailsFailed: false,
		});
	});

	it('обрабатывает GET_ORDER_DETAILS_SUCCESS', () => {
		const mockOrder = { number: 1234, name: 'Test Burger' };
		const action = {
			type: GET_ORDER_DETAILS_SUCCESS,
			orderDetails: mockOrder,
		};
		const state = orderDetailsReducer(
			{ ...initialStateOrderDetails, orderDetailsRequest: true },
			action
		);
		expect(state).toEqual({
			...initialStateOrderDetails,
			orderDetails: mockOrder,
			orderDetailsRequest: false,
		});
	});

	it('обрабатывает GET_ORDER_DETAILS_FAILED', () => {
		const action = { type: GET_ORDER_DETAILS_FAILED };
		const state = orderDetailsReducer(
			{ ...initialStateOrderDetails, orderDetailsRequest: true },
			action
		);
		expect(state).toEqual({
			...initialStateOrderDetails,
			orderDetailsRequest: false,
			orderDetailsFailed: true,
		});
	});

	it('обрабатывает GET_ORDER_INGREDIENT_REQUEST', () => {
		const action = { type: GET_ORDER_INGREDIENT_REQUEST };
		const state = orderDetailsReducer(initialStateOrderDetails, action);
		expect(state).toEqual({
			...initialStateOrderDetails,
			orderIngredientsRequest: true,
			orderIngredientsFailed: false,
		});
	});

	it('обрабатывает GET_ORDER_INGREDIENT_SUCCESS', () => {
		const mockIngredients = [
			{ _id: '1', name: 'Bun' },
			{ _id: '2', name: 'Patty' },
		];
		const action = {
			type: GET_ORDER_INGREDIENT_SUCCESS,
			orderIngredients: mockIngredients,
		};
		const state = orderDetailsReducer(
			{ ...initialStateOrderDetails, orderIngredientsRequest: true },
			action
		);
		expect(state).toEqual({
			...initialStateOrderDetails,
			orderIngredients: mockIngredients,
			orderIngredientsRequest: false,
		});
	});

	it('обрабатывает GET_ORDER_INGREDIENT_FAILED', () => {
		const action = { type: GET_ORDER_INGREDIENT_FAILED };
		const state = orderDetailsReducer(
			{ ...initialStateOrderDetails, orderIngredientsRequest: true },
			action
		);
		expect(state).toEqual({
			...initialStateOrderDetails,
			orderIngredientsRequest: false,
			orderIngredientsFailed: true,
		});
	});
});
