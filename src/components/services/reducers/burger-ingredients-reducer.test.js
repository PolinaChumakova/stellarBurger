import { describe, expect, it } from 'vitest';
import {
	GET_BURGER_INGREDIENTS_FAILED,
	GET_BURGER_INGREDIENTS_REQUEST,
	GET_BURGER_INGREDIENTS_SUCCESS,
} from '../actions';
import {
	burgerIngredientsReducer,
	initialStateBurgerIngredients,
} from './burger-ingredients-reducer';

const mockIngredients = [
	{
		_id: '1',
		name: 'Ingredient 1',
		type: 'sauce',
		proteins: 1,
		fat: 2,
		carbohydrates: 3,
		calories: 10,
		price: 100,
		image: 'image.jpg',
		image_large: 'image_large.jpg',
		image_mobile: 'image_mobile.jpg',
		__v: 0,
	},
	{
		_id: '2',
		name: 'Ingredient 2',
		type: 'main',
		proteins: 1,
		fat: 2,
		carbohydrates: 3,
		calories: 20,
		price: 200,
		image: 'image2.jpg',
		image_large: 'image_large2.jpg',
		image_mobile: 'image_mobile2.jpg',
		__v: 0,
	},
];

describe('burgerIngredientsReducer', () => {
	it('должен вернуть initialStateBurgerIngredients по умолчанию', () => {
		const state = burgerIngredientsReducer(undefined, { type: '' });
		expect(state).toEqual(initialStateBurgerIngredients);
	});

	it('обрабатывает GET_BURGER_INGREDIENTS_REQUEST', () => {
		const action = { type: GET_BURGER_INGREDIENTS_REQUEST };
		const state = burgerIngredientsReducer(
			initialStateBurgerIngredients,
			action
		);
		expect(state).toEqual({
			...initialStateBurgerIngredients,
			burgerIngredientsRequest: true,
			burgerIngredientsFailed: false,
		});
	});

	it('обрабатывает GET_BURGER_INGREDIENTS_SUCCESS', () => {
		const action = {
			type: GET_BURGER_INGREDIENTS_SUCCESS,
			burgerIngredients: mockIngredients,
		};
		const state = burgerIngredientsReducer(
			{ ...initialStateBurgerIngredients, burgerIngredientsRequest: true },
			action
		);

		const expectedMap = {
			1: mockIngredients[0],
			2: mockIngredients[1],
		};

		expect(state).toEqual({
			...initialStateBurgerIngredients,
			burgerIngredients: mockIngredients,
			burgerIngredientsMap: expectedMap,
			burgerIngredientsRequest: false,
		});
	});

	it('обрабатывает GET_BURGER_INGREDIENTS_FAILED', () => {
		const action = { type: GET_BURGER_INGREDIENTS_FAILED };
		const state = burgerIngredientsReducer(
			{ ...initialStateBurgerIngredients, burgerIngredientsRequest: true },
			action
		);
		expect(state).toEqual({
			...initialStateBurgerIngredients,
			burgerIngredientsRequest: false,
			burgerIngredientsFailed: true,
		});
	});
});
