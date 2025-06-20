export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';

export const GET_BURGER_CONSTRUCTOR = 'GET_BURGER_CONSTRUCTOR';
export const DELETE_BURGER_CONSTRUCTOR = 'DELETE_BURGER_CONSTRUCTOR';
export const SORT_BURGER_CONSTRUCTOR = 'SORT_BURGER_CONSTRUCTOR';

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

import { v4 as uuidv4 } from 'uuid';
import { BASE_URL, checkResponse } from '@utils/api';

export function getBurgerIngredients() {
	return (dispatch) => {
		const baseURL = `${BASE_URL}/ingredients`;

		dispatch({
			type: GET_BURGER_INGREDIENTS_REQUEST,
		});
		fetch(baseURL)
			.then(checkResponse)
			.then((res) => {
				if (res && res.success) {
					dispatch({
						type: GET_BURGER_INGREDIENTS_SUCCESS,
						burgerIngredients: res.data,
					});
				} else {
					dispatch({
						type: GET_BURGER_INGREDIENTS_FAILED,
					});
				}
			})
			.catch(() => {
				dispatch({
					type: GET_BURGER_INGREDIENTS_FAILED,
				});
			});
	};
}

export const setBurgerConstructor = (constructorIngredients) => ({
	type: GET_BURGER_CONSTRUCTOR,
	payload: { ...constructorIngredients, uniqueId: uuidv4() },
});

export const deleteBurgerConstructor = (idIngredient) => ({
	type: DELETE_BURGER_CONSTRUCTOR,
	payload: idIngredient,
});

export const sortBurgerConstructor = (fromIndex, toIndex) => ({
	type: SORT_BURGER_CONSTRUCTOR,
	payload: { fromIndex, toIndex },
});

export const setIngredientDetails = (ingredientDetails) => ({
	type: GET_INGREDIENT_DETAILS,
	payload: ingredientDetails,
});

export const deleteIngredientDetails = () => ({
	type: DELETE_INGREDIENT_DETAILS,
});

export function getOrderDetails(ingredientIds) {
	return (dispatch) => {
		const baseURL = `${BASE_URL}/orders`;
		dispatch({
			type: GET_ORDER_DETAILS_REQUEST,
			payload: ingredientIds,
		});
		fetch(baseURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients: ingredientIds }),
		})
			.then(checkResponse)
			.then((res) => {
				if (res && res.success) {
					dispatch({
						type: GET_ORDER_DETAILS_SUCCESS,
						orderDetails: res.order,
					});
				} else {
					dispatch({
						type: GET_ORDER_DETAILS_FAILED,
					});
				}
			})
			.catch(() => {
				dispatch({
					type: GET_ORDER_DETAILS_FAILED,
				});
			});
	};
}
