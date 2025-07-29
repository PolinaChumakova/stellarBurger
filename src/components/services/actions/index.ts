export const GET_BURGER_INGREDIENTS_REQUEST =
	'GET_BURGER_INGREDIENTS_REQUEST' as const;
export const GET_BURGER_INGREDIENTS_SUCCESS =
	'GET_BURGER_INGREDIENTS_SUCCESS' as const;
export const GET_BURGER_INGREDIENTS_FAILED =
	'GET_BURGER_INGREDIENTS_FAILED' as const;

export const GET_BURGER_CONSTRUCTOR = 'GET_BURGER_CONSTRUCTOR' as const;
export const DELETE_BURGER_CONSTRUCTOR = 'DELETE_BURGER_CONSTRUCTOR' as const;
export const SORT_BURGER_CONSTRUCTOR = 'SORT_BURGER_CONSTRUCTOR' as const;

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS' as const;
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS' as const;

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST' as const;
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS' as const;
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED' as const;

import { v4 as uuidv4 } from 'uuid';
import { BASE_URL, checkResponse } from '@utils/api';
import { AppDispatch, AppThunk, TIngredient } from '@/utils/types';

export interface IGetBurgerIngredientsRequest {
	readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}
export interface IGetBurgerIngredientsSuccess {
	readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
	readonly burgerIngredients: TIngredient[];
}

export interface IGetBurgerIngredientsFailed {
	readonly type: typeof GET_BURGER_INGREDIENTS_FAILED;
}

export interface ISetBurgerConstructor {
	readonly type: typeof GET_BURGER_CONSTRUCTOR;
	readonly payload: TIngredient & { uniqueId: string };
}

export interface IDeleteBurgerConstructor {
	readonly type: typeof DELETE_BURGER_CONSTRUCTOR;
	readonly payload: string;
}

export interface ISortBurgerConstructor {
	readonly type: typeof SORT_BURGER_CONSTRUCTOR;
	readonly payload: {
		fromIndex: number;
		toIndex: number;
	};
}

export interface ISetIngredientDetails {
	readonly type: typeof GET_INGREDIENT_DETAILS;
	readonly payload: TIngredient;
}

export interface IDeleteIngredientDetails {
	readonly type: typeof DELETE_INGREDIENT_DETAILS;
}

export interface IGetOrderDetailsRequest {
	readonly type: typeof GET_ORDER_DETAILS_REQUEST;
	readonly payload: string[];
}

export interface IGetOrderDetailsSuccess {
	readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
	readonly orderDetails: number;
}

export interface IGetOrderDetailsFailed {
	readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

export type TBurgersActions =
	| IGetBurgerIngredientsRequest
	| IGetBurgerIngredientsSuccess
	| IGetBurgerIngredientsFailed
	| ISetBurgerConstructor
	| IDeleteBurgerConstructor
	| ISortBurgerConstructor
	| ISetIngredientDetails
	| IDeleteIngredientDetails
	| IGetOrderDetailsRequest
	| IGetOrderDetailsSuccess
	| IGetOrderDetailsFailed;

export const getBurgerIngredients = (): AppThunk => (dispatch: AppDispatch) => {
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

export const setBurgerConstructor = (
	constructorIngredients: TIngredient
): ISetBurgerConstructor => ({
	type: GET_BURGER_CONSTRUCTOR,
	payload: { ...constructorIngredients, uniqueId: uuidv4() },
});

export const deleteBurgerConstructor = (
	idIngredient: string
): IDeleteBurgerConstructor => ({
	type: DELETE_BURGER_CONSTRUCTOR,
	payload: idIngredient,
});

export const sortBurgerConstructor = (
	fromIndex: number,
	toIndex: number
): ISortBurgerConstructor => ({
	type: SORT_BURGER_CONSTRUCTOR,
	payload: { fromIndex, toIndex },
});

export const setIngredientDetails = (
	ingredientDetails: TIngredient
): ISetIngredientDetails => ({
	type: GET_INGREDIENT_DETAILS,
	payload: ingredientDetails,
});

export const deleteIngredientDetails = (): IDeleteIngredientDetails => ({
	type: DELETE_INGREDIENT_DETAILS,
});

export const getOrderDetails =
	(ingredientIds: string[]): AppThunk =>
	(dispatch: AppDispatch) => {
		const baseURL = `${BASE_URL}/orders`;
		dispatch({
			type: GET_ORDER_DETAILS_REQUEST,
			payload: ingredientIds,
		});
		fetch(baseURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('accessToken') ?? '',
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
