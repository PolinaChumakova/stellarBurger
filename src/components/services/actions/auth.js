import {
	apiRegisterUser,
	apiLoginUser,
	apiGetUser,
	apiUpdateUser,
	apiLogoutUser,
} from '@utils/api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export function registerUser(email, password, name) {
	return async (dispatch) => {
		dispatch({
			type: REGISTER_USER_REQUEST,
		});
		try {
			const data = await apiRegisterUser(email, password, name);
			if (data.success) {
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('accessToken', data.accessToken);
				dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
			} else {
				dispatch({ type: REGISTER_USER_FAILED });
			}
		} catch (error) {
			dispatch({ type: REGISTER_USER_FAILED });
		}
	};
}

export function loginUser(email, password) {
	return async (dispatch) => {
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
		} catch (error) {
			dispatch({ type: LOGIN_USER_FAILED, payload: error.message });
		}
	};
}

export function getUser() {
	return async (dispatch) => {
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
		} catch (error) {
			dispatch({ type: GET_USER_FAILED, payload: error.message });
		}
	};
}

export const setIsAuthChecked = (isAuthChecked) => ({
	type: SET_IS_AUTH_CHECKED,
	payload: isAuthChecked,
});

export function checkUserAuth() {
	return async (dispatch) => {
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
}

export function updateUser(name, email, password) {
	return async (dispatch) => {
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
		} catch (error) {
			dispatch({ type: UPDATE_USER_FAILED, payload: error.message });
		}
	};
}

export function logoutUser() {
	return async (dispatch) => {
		dispatch({
			type: LOGOUT_USER_REQUEST,
		});
		try {
			const data = await apiLogoutUser();
			if (data.success) {
				localStorage.removeItem('refreshToken');
				localStorage.removeItem('accessToken');
				dispatch({ type: LOGOUT_USER_SUCCESS });
			} else {
				dispatch({ type: LOGOUT_USER_FAILED, payload: data.message });
			}
		} catch (error) {
			dispatch({ type: LOGOUT_USER_FAILED, payload: error.message });
		}
	};
}
