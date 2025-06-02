import {
	GET_BURGER_CONSTRUCTOR,
	DELETE_BURGER_CONSTRUCTOR,
	SORT_BURGER_CONSTRUCTOR,
} from '../actions';

const initialState = {
	bun: null,
	ingredients: [],
};

export function burgerConstructorReducer(state = initialState, action) {
	switch (action.type) {
		case GET_BURGER_CONSTRUCTOR: {
			if (action.payload.type === 'bun') {
				return {
					...state,
					bun: action.payload,
				};
			}
			const ingredientWithIndexAndId = {
				...action.payload,
				index: state.ingredients.length - 1,
			};
			return {
				...state,
				ingredients: [...state.ingredients, ingredientWithIndexAndId],
			};
		}
		case DELETE_BURGER_CONSTRUCTOR:
			if (action.payload === 'bun') {
				return {
					...state,
					bun: null,
				};
			}
			return {
				...state,
				ingredients: state.ingredients.filter(
					(item) => item.uniqueId !== action.payload
				),
			};
		case SORT_BURGER_CONSTRUCTOR: {
			const { fromIndex, toIndex } = action.payload;
			const ingredients = [...state.ingredients];
			ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
			return {
				...state,
				ingredients: ingredients,
			};
		}
		default:
			return state;
	}
}
