import {
	GET_BURGER_INGREDIENTS_FAILED,
	GET_BURGER_INGREDIENTS_REQUEST,
	GET_BURGER_INGREDIENTS_SUCCESS,
} from '../actions';

const initialState = {
	orderDetailsRequest: false,
	orderDetailsFailed: false,
	orderDetails: null,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BURGER_INGREDIENTS_REQUEST: {
			return {
				...state,
				burgerIngredientsRequest: true,
				burgerIngredientsFailed: false,
			};
		}
		case GET_BURGER_INGREDIENTS_SUCCESS: {
			return {
				...state,
				burgerIngredients: action.burgerIngredients,
				burgerIngredientsRequest: false,
			};
		}
		case GET_BURGER_INGREDIENTS_FAILED: {
			return {
				...state,
				burgerIngredientsFailed: true,
				burgerIngredientsRequest: false,
			};
		}
		default: {
			return state;
		}
	}
};
