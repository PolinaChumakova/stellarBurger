import { describe, expect, it } from 'vitest';
import {
	DELETE_BURGER_CONSTRUCTOR,
	GET_BURGER_CONSTRUCTOR,
	SORT_BURGER_CONSTRUCTOR,
} from '../actions';
import {
	burgerConstructorReducer,
	initialStateBurgerConstructor,
} from './burger-constructor-reducer';

const bunIngredient = {
	_id: '1',
	name: 'Test Bun',
	type: 'bun',
	price: 2,
	image: 'img.jpg',
	image_large: '',
	image_mobile: '',
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 0,
	__v: 0,
	uniqueId: 'test-uuid',
};

const fillingIngredient = {
	_id: '2',
	name: 'Test Sauce',
	type: 'sauce',
	price: 1,
	image: 'img.jpg',
	image_large: '',
	image_mobile: '',
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 0,
	__v: 0,
	uniqueId: 'test-uuid',
};

describe('burgerConstructorReducer', () => {
	it('должен возвращать initialStateBurgerConstructor по умолчанию', () => {
		expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(
			initialStateBurgerConstructor
		);
	});

	it('должен добавлять булку', () => {
		const action = {
			type: GET_BURGER_CONSTRUCTOR,
			payload: { ...bunIngredient, type: 'bun' },
		};
		const state = burgerConstructorReducer(
			initialStateBurgerConstructor,
			action
		);
		expect(state).toEqual({
			...initialStateBurgerConstructor,
			bun: { ...bunIngredient, type: 'bun' },
		});
	});

	it('должен добавлять начинку с уникальным ID и index', () => {
		const action = {
			type: GET_BURGER_CONSTRUCTOR,
			payload: { ...fillingIngredient, type: 'sauce' },
		};
		const state = burgerConstructorReducer(
			initialStateBurgerConstructor,
			action
		);
		expect(state.ingredients).toHaveLength(1);
		expect(state.ingredients[0]).toMatchObject({
			...fillingIngredient,
			type: 'sauce',
			index: -1,
		});
	});

	it('должен удалять булку по payload === "bun"', () => {
		const startState = {
			...initialStateBurgerConstructor,
			bun: bunIngredient,
		};
		const action = {
			type: DELETE_BURGER_CONSTRUCTOR,
			payload: 'bun',
		};
		const state = burgerConstructorReducer(startState, action);
		expect(state.bun).toBeNull();
	});

	it('должен удалять ингредиент по uniqueId', () => {
		const startState = {
			...initialStateBurgerConstructor,
			ingredients: [fillingIngredient],
		};
		const action = {
			type: DELETE_BURGER_CONSTRUCTOR,
			payload: 'test-uuid',
		};
		const state = burgerConstructorReducer(startState, action);
		expect(state.ingredients).toHaveLength(0);
	});

	it('должен сортировать ингредиенты по fromIndex и toIndex', () => {
		const startState = {
			...initialStateBurgerConstructor,
			ingredients: [
				{ ...fillingIngredient, uniqueId: 'a' },
				{ ...fillingIngredient, uniqueId: 'b' },
				{ ...fillingIngredient, uniqueId: 'c' },
			],
		};
		const action = {
			type: SORT_BURGER_CONSTRUCTOR,
			payload: { fromIndex: 0, toIndex: 2 },
		};
		const state = burgerConstructorReducer(startState, action);
		const result = state.ingredients.map((el) => el.uniqueId);
		expect(result).toEqual(['b', 'c', 'a']);
	});
});
