import { rootReducer } from '@/components/services/reducers';

import { store } from '@/main';
import { ThunkAction } from 'redux-thunk';
import { TBurgersActions } from '@/components/services/actions';
import { TAuthActions } from '@/components/services/actions/auth';

export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
	uniqueId: string;
};

export type TIngredientWithIndex = TIngredient & {
	index: number;
};

export type RootState = ReturnType<typeof rootReducer>;

export type TAuthAndBurgersActions = TAuthActions | TBurgersActions;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	undefined,
	TAuthAndBurgersActions
>;

export type AppDispatch = typeof store.dispatch;
