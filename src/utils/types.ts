import { rootReducer } from '@/components/services/reducers';

import { store } from '@/main';
import { ThunkAction } from 'redux-thunk';
import { TBurgersActions } from '@/components/services/actions';
import { TAuthActions } from '@/components/services/actions/auth';
import {
	TWsActions,
	WS_ALL_CONNECTION_CLOSED,
	WS_ALL_CONNECTION_ERROR,
	WS_ALL_CONNECTION_START,
	WS_ALL_CONNECTION_SUCCESS,
	WS_GET_ALL_ORDERS,
	WS_GET_USER_ORDERS,
	WS_USER_CONNECTION_CLOSED,
	WS_USER_CONNECTION_ERROR,
	WS_USER_CONNECTION_START,
	WS_USER_CONNECTION_SUCCESS,
} from '@/components/services/actions/ws-actions';

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

export interface IOrder {
	ingredients: string[];
	_id: string;
	status: 'done' | 'pending' | 'created';
	number: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface IWSOrdersResponse {
	success: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppActions = TAuthActions | TBurgersActions | TWsActions;

export type TWSAllStoreActions = {
	wsInit: typeof WS_ALL_CONNECTION_START;
	onOpen: typeof WS_ALL_CONNECTION_SUCCESS;
	onClose: typeof WS_ALL_CONNECTION_CLOSED;
	onError: typeof WS_ALL_CONNECTION_ERROR;
	onMessage: typeof WS_GET_ALL_ORDERS;
};

export type TWSUserStoreActions = {
	wsInit: typeof WS_USER_CONNECTION_START;
	onOpen: typeof WS_USER_CONNECTION_SUCCESS;
	onClose: typeof WS_USER_CONNECTION_CLOSED;
	onError: typeof WS_USER_CONNECTION_ERROR;
	onMessage: typeof WS_GET_USER_ORDERS;
};

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	undefined,
	AppActions
>;

export type AppDispatch = typeof store.dispatch;
