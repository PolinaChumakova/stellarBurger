import { AppDispatch, AppThunk } from '@/utils/types';
import {
	apiRegisterUser,
	apiLoginUser,
	apiGetUser,
	apiUpdateUser,
	apiLogoutUser,
} from '@utils/api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST' as const;
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS' as const;
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED' as const;

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST' as const;
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS' as const;
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILURE' as const;

export const GET_USER_REQUEST = 'GET_USER_REQUEST' as const;
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS' as const;
export const GET_USER_FAILED = 'GET_USER_FAILED' as const;
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED' as const;

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST' as const;
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS' as const;
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED' as const;

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST' as const;
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS' as const;
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED' as const;

interface User {
	name: string;
	email: string;
}

interface IRegisterUserRequestAction {
	readonly type: typeof REGISTER_USER_REQUEST;
}

interface IRegisterUserSuccessAction {
	readonly type: typeof REGISTER_USER_SUCCESS;
	readonly payload: User;
}

interface IRegisterUserFailedAction {
	readonly type: typeof REGISTER_USER_FAILED;
	readonly payload: string;
}

interface ILoginUserRequestAction {
	readonly type: typeof LOGIN_USER_REQUEST;
}

interface ILoginUserSuccessAction {
	readonly type: typeof LOGIN_USER_SUCCESS;
	readonly payload: User;
}

interface ILoginUserFailedAction {
	readonly type: typeof LOGIN_USER_FAILED;
	readonly payload: string;
}

interface IGetUserRequestAction {
	readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccessAction {
	readonly type: typeof GET_USER_SUCCESS;
	readonly payload: User;
}

interface IGetUserFailedAction {
	readonly type: typeof GET_USER_FAILED;
	readonly payload: string;
}

interface ISetIsAuthCheckedAction {
	readonly type: typeof SET_IS_AUTH_CHECKED;
	readonly payload: boolean;
}

interface IUpdateUserRequestAction {
	readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccessAction {
	readonly type: typeof UPDATE_USER_SUCCESS;
	readonly payload: User;
}

interface IUpdateUserFailedAction {
	readonly type: typeof UPDATE_USER_FAILED;
	readonly payload: string;
}

interface ILogoutUserRequestAction {
	readonly type: typeof LOGOUT_USER_REQUEST;
}

interface ILogoutUserSuccessAction {
	readonly type: typeof LOGOUT_USER_SUCCESS;
}

interface ILogoutUserFailedAction {
	readonly type: typeof LOGOUT_USER_FAILED;
	readonly payload: string;
}

export type TAuthActions =
	| IRegisterUserRequestAction
	| IRegisterUserSuccessAction
	| IRegisterUserFailedAction
	| ILoginUserRequestAction
	| ILoginUserSuccessAction
	| ILoginUserFailedAction
	| IGetUserRequestAction
	| IGetUserSuccessAction
	| IGetUserFailedAction
	| ISetIsAuthCheckedAction
	| IUpdateUserRequestAction
	| IUpdateUserSuccessAction
	| IUpdateUserFailedAction
	| ILogoutUserRequestAction
	| ILogoutUserSuccessAction
	| ILogoutUserFailedAction;

export const registerUser =
	(email: string, password: string, name: string): AppThunk =>
	async (dispatch: AppDispatch) => {
		dispatch({
			type: REGISTER_USER_REQUEST,
		});
		try {
			const data = await apiRegisterUser(email, password, name);
			if (data && data.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
			} else {
				dispatch({ type: REGISTER_USER_FAILED, payload: data.message });
			}
		} catch (error: unknown) {
			dispatch({ type: REGISTER_USER_FAILED, payload: error });
		}
	};

export const loginUser =
	(email: string, password: string): AppThunk =>
	async (dispatch: AppDispatch) => {
		dispatch({
			type: LOGIN_USER_REQUEST,
		});
		try {
			const data = await apiLoginUser(email, password);
			if (data.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
			} else {
				dispatch({ type: LOGIN_USER_FAILED, payload: data.message });
			}
		} catch (error: unknown) {
			dispatch({ type: LOGIN_USER_FAILED, payload: error });
		}
	};

export const getUser = (): AppThunk => async (dispatch: AppDispatch) => {
	dispatch({
		type: GET_USER_REQUEST,
	});
	try {
		const data = await apiGetUser();
		if (data.success) {
			dispatch({ type: GET_USER_SUCCESS, payload: data.user });
		} else {
			dispatch({ type: GET_USER_FAILED, payload: data.message });
		}
	} catch (error: unknown) {
		dispatch({ type: GET_USER_FAILED, payload: error });
	}
};

export const setIsAuthChecked = (isAuthChecked: boolean) => ({
	type: SET_IS_AUTH_CHECKED,
	payload: isAuthChecked,
});

export const checkUserAuth = (): AppThunk => async (dispatch: AppDispatch) => {
	if (localStorage.getItem('accessToken')) {
		try {
			await dispatch(getUser());
			dispatch(setIsAuthChecked(true));
		} catch (error) {
			console.error('Ошибка при проверке аутентификации:', error);
			dispatch(setIsAuthChecked(true));
		}
	} else {
		dispatch(setIsAuthChecked(true));
	}
};

export const updateUser =
	(name: string, email: string, password: string): AppThunk =>
	async (dispatch: AppDispatch) => {
		dispatch({
			type: UPDATE_USER_REQUEST,
		});
		try {
			const data = await apiUpdateUser(name, email, password);
			if (data.success) {
				dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
			} else {
				dispatch({ type: UPDATE_USER_FAILED, payload: data.message });
			}
		} catch (error: unknown) {
			dispatch({ type: UPDATE_USER_FAILED, payload: error });
		}
	};

export const logoutUser = (): AppThunk => async (dispatch: AppDispatch) => {
	dispatch({
		type: LOGOUT_USER_REQUEST,
	});
	try {
		const data = await apiLogoutUser();
		if (data && data.success) {
			localStorage.clear();
			dispatch({ type: LOGOUT_USER_SUCCESS });
		} else {
			dispatch({ type: LOGOUT_USER_FAILED, payload: data.message });
		}
	} catch (error: unknown) {
		dispatch({ type: LOGOUT_USER_FAILED, payload: error });
	}
};
