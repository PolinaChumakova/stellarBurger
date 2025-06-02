import { GET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../actions';

const initialState = {
	ingredientDetails: null,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENT_DETAILS: {
			return {
				...state,
				ingredientDetails: action.payload,
			};
		}
		case DELETE_INGREDIENT_DETAILS: {
			return {
				...state,
				ingredientDetails: null,
			};
		}
		default: {
			return state;
		}
	}
};
