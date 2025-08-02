import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILED,
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILED,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
	SET_IS_AUTH_CHECKED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAILED,
	TAuthActions,
} from '../actions/auth';

interface User {
	name: string;
	email: string;
}

type TInitialState = {
	user: User | null;
	isLoading: boolean;
	error: string | null;
	isAuthChecked: boolean;
};

export const initialStateAuth = {
	user: null,
	isLoading: false,
	error: null,
	isAuthChecked: false,
};

export function authReducer(
	state = initialStateAuth,
	action: TAuthActions
): TInitialState {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				error: null,
			};
		case REGISTER_USER_FAILED:
			return {
				...state,
				isLoading: false,
				user: null,
			};

		case LOGIN_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				error: null,
			};
		case LOGIN_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				user: null,
			};

		case GET_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case GET_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				error: null,
			};
		case GET_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				user: null,
			};
		case SET_IS_AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: action.payload,
			};

		case UPDATE_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
				error: null,
			};
		case UPDATE_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		case LOGOUT_USER_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case LOGOUT_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: null,
				error: null,
			};
		case LOGOUT_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
}
