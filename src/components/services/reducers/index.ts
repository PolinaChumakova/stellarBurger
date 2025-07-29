import { combineReducers } from 'redux';

import { authReducer } from './auth-reducer';
import { burgerIngredientsReducer } from './burger-ingredients-reducer';
import { burgerConstructorReducer } from './burger-constructor-reducer';
import { orderDetailsReducer } from './order-details-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reducer';

export const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	ingredientDetails: ingredientDetailsReducer,
	orderDetails: orderDetailsReducer,
	auth: authReducer,
});
