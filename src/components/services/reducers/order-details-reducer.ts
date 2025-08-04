import {
	GET_ORDER_DETAILS_FAILED,
	GET_ORDER_DETAILS_REQUEST,
	GET_ORDER_DETAILS_SUCCESS,
	GET_ORDER_INGREDIENT_FAILED,
	GET_ORDER_INGREDIENT_REQUEST,
	GET_ORDER_INGREDIENT_SUCCESS,
	TBurgersActions,
} from '../actions';

export const initialStateOrderDetails = {
	orderDetailsRequest: false,
	orderDetailsFailed: false,
	orderDetails: null,

	orderIngredientsRequest: false,
	orderIngredientsFailed: false,
	orderIngredients: null,
};

export const orderDetailsReducer = (
	state = initialStateOrderDetails,
	action: TBurgersActions
) => {
	switch (action.type) {
		case GET_ORDER_DETAILS_REQUEST: {
			return {
				...state,
				orderDetailsRequest: true,
				orderDetailsFailed: false,
			};
		}
		case GET_ORDER_DETAILS_SUCCESS: {
			return {
				...state,
				orderDetails: action.orderDetails,
				orderDetailsRequest: false,
			};
		}
		case GET_ORDER_DETAILS_FAILED: {
			return {
				...state,
				orderDetailsFailed: true,
				orderDetailsRequest: false,
			};
		}
		case GET_ORDER_INGREDIENT_REQUEST: {
			return {
				...state,
				orderIngredientsRequest: true,
				orderIngredientsFailed: false,
			};
		}
		case GET_ORDER_INGREDIENT_SUCCESS: {
			return {
				...state,
				orderIngredients: action.orderIngredients,
				orderIngredientsRequest: false,
			};
		}
		case GET_ORDER_INGREDIENT_FAILED: {
			return {
				...state,
				orderIngredientsFailed: true,
				orderIngredientsRequest: false,
			};
		}
		default: {
			return state;
		}
	}
};
