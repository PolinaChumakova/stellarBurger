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
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILED,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_SUCCESS,
	LOGOUT_USER_FAILED,
} from '../actions/auth';

const initialState = {
	user: null,
	isLoading: false,
	error: null,
	isAuthenticated: false,
};

export function authReducer(state = initialState, action) {
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
				isAuthenticated: true,
				error: null,
			};
		case REGISTER_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				isAuthenticated: false,
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
				isAuthenticated: true,
				error: null,
			};
		case LOGIN_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				isAuthenticated: false,
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
				isAuthenticated: true,
				error: null,
			};
		case GET_USER_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				isAuthenticated: false,
				user: null,
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
				isAuthenticated: false,
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
