import { rootReducer } from '@components/services/reducers';

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
};

export type TIngredientWithIndex = TIngredient & {
	index: number;
};

export type RootState = ReturnType<typeof rootReducer>;
