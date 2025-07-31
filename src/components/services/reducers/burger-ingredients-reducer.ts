import { TIngredient } from '@/utils/types';
import {
	GET_BURGER_INGREDIENTS_FAILED,
	GET_BURGER_INGREDIENTS_REQUEST,
	GET_BURGER_INGREDIENTS_SUCCESS,
	TBurgersActions,
} from '../actions';

type TInitialState = {
	burgerIngredientsRequest: boolean;
	burgerIngredientsFailed: boolean;
	burgerIngredients: TIngredient[];
	burgerIngredientsMap: { [key: string]: TIngredient };
};

const initialState: TInitialState = {
	burgerIngredientsRequest: false,
	burgerIngredientsFailed: false,
	burgerIngredients: [],
	burgerIngredientsMap: {},
};

export const burgerIngredientsReducer = (
	state = initialState,
	action: TBurgersActions
): TInitialState => {
	switch (action.type) {
		case GET_BURGER_INGREDIENTS_REQUEST: {
			return {
				...state,
				burgerIngredientsRequest: true,
				burgerIngredientsFailed: false,
			};
		}
		case GET_BURGER_INGREDIENTS_SUCCESS: {
			const burgerIngredientsMap: { [key: string]: TIngredient } =
				action.burgerIngredients.reduce(
					(acc: { [key: string]: TIngredient }, ingredient: TIngredient) => {
						acc[ingredient._id] = ingredient;
						return acc;
					},
					{}
				);

			return {
				...state,
				burgerIngredients: action.burgerIngredients,
				burgerIngredientsMap: burgerIngredientsMap,
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
