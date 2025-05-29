import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reducer';
import { burgerConstructorReducer } from './burger-constructor-reducer';
import { orderDetailsReducer } from './order-details-reducer';

export const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	ingredientDetails: ingredientDetailsReducer,
	orderDetails: orderDetailsReducer,
});
