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

export function getBurgerIngredients() {
	return (dispatch) => {
		const baseURL = 'https://norma.nomoreparties.space/api/ingredients';

		dispatch({
			type: GET_BURGER_INGREDIENTS_REQUEST,
		});
		fetch(baseURL)
			.then((res) => res.json())
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
	payload: constructorIngredients,
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
		const baseURL = 'https://norma.nomoreparties.space/api/orders';
		dispatch({
			type: GET_ORDER_DETAILS_REQUEST,
			payload: ingredientIds,
		});
		fetch(baseURL)
			.then((res) => res.json())
			.then((res) => {
				if (res && res.success) {
					dispatch({
						type: GET_ORDER_DETAILS_SUCCESS,
						orderDetails: res.data,
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
