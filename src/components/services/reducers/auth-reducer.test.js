import { describe, expect, it } from 'vitest';
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
	SET_IS_AUTH_CHECKED,
} from '../actions/auth';

import { authReducer, initialStateAuth } from './auth-reducer';

const mockUser = {
	name: 'John Doe',
	email: 'john@example.com',
};

describe('authReducer', () => {
	it('должен вернуть initialState по умолчанию', () => {
		const state = authReducer(undefined, { type: '' });
		expect(state).toEqual(initialStateAuth);
	});

	describe('проверка REGISTER_USER', () => {
		it('обрабатывает REGISTER_USER_REQUEST', () => {
			const state = authReducer(initialStateAuth, {
				type: REGISTER_USER_REQUEST,
			});
			expect(state).toEqual({ ...initialStateAuth, isLoading: true });
		});

		it('обрабатывает REGISTER_USER_SUCCESS', () => {
			const state = authReducer(
				{ ...initialStateAuth, isLoading: true },
				{
					type: REGISTER_USER_SUCCESS,
					payload: mockUser,
				}
			);
			expect(state).toEqual({
				...initialStateAuth,
				isLoading: false,
				user: mockUser,
			});
		});

		it('обрабатывает REGISTER_USER_FAILED', () => {
			const state = authReducer(
				{ ...initialStateAuth, isLoading: true },
				{
					type: REGISTER_USER_FAILED,
				}
			);
			expect(state).toEqual({
				...initialStateAuth,
				isLoading: false,
				user: null,
			});
		});
	});

	describe('проверка LOGIN_USER', () => {
		it('обрабатывает LOGIN_USER_REQUEST', () => {
			const state = authReducer(initialStateAuth, {
				type: LOGIN_USER_REQUEST,
			});
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает LOGIN_USER_SUCCESS', () => {
			const state = authReducer(
				{ ...initialStateAuth, isLoading: true },
				{
					type: LOGIN_USER_SUCCESS,
					payload: mockUser,
				}
			);
			expect(state.user).toEqual(mockUser);
			expect(state.isLoading).toBe(false);
		});

		it('обрабатывает LOGIN_USER_FAILED', () => {
			const state = authReducer(
				{ ...initialStateAuth, isLoading: true },
				{
					type: LOGIN_USER_FAILED,
					payload: 'Invalid credentials',
				}
			);
			expect(state).toEqual({
				...initialStateAuth,
				isLoading: false,
				error: 'Invalid credentials',
				user: null,
			});
		});
	});

	describe('проверка GET_USER', () => {
		it('обрабатывает GET_USER_REQUEST', () => {
			const state = authReducer(initialStateAuth, {
				type: GET_USER_REQUEST,
			});
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает GET_USER_SUCCESS', () => {
			const state = authReducer(initialStateAuth, {
				type: GET_USER_SUCCESS,
				payload: mockUser,
			});
			expect(state.user).toEqual(mockUser);
		});

		it('обрабатывает GET_USER_FAILED', () => {
			const state = authReducer(initialStateAuth, {
				type: GET_USER_FAILED,
				payload: 'Auth failed',
			});
			expect(state.user).toBeNull();
			expect(state.error).toBe('Auth failed');
		});
	});

	describe('проверка UPDATE_USER', () => {
		it('обрабатывает UPDATE_USER_REQUEST', () => {
			const state = authReducer(initialStateAuth, {
				type: UPDATE_USER_REQUEST,
			});
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает UPDATE_USER_SUCCESS', () => {
			const state = authReducer(initialStateAuth, {
				type: UPDATE_USER_SUCCESS,
				payload: mockUser,
			});
			expect(state.user).toEqual(mockUser);
		});

		it('обрабатывает UPDATE_USER_FAILED', () => {
			const state = authReducer(initialStateAuth, {
				type: UPDATE_USER_FAILED,
				payload: 'Server error',
			});
			expect(state.error).toBe('Server error');
		});
	});

	describe('проверка LOGOUT_USER', () => {
		it('обрабатывает LOGOUT_USER_REQUEST', () => {
			const state = authReducer(initialStateAuth, {
				type: LOGOUT_USER_REQUEST,
			});
			expect(state.isLoading).toBe(true);
		});

		it('обрабатывает LOGOUT_USER_SUCCESS', () => {
			const state = authReducer(
				{ ...initialStateAuth, user: mockUser },
				{
					type: LOGOUT_USER_SUCCESS,
				}
			);
			expect(state.user).toBeNull();
		});

		it('обрабатывает LOGOUT_USER_FAILED', () => {
			const state = authReducer(initialStateAuth, {
				type: LOGOUT_USER_FAILED,
				payload: 'Logout failed',
			});
			expect(state.error).toBe('Logout failed');
		});
	});

	describe('проверка SET_IS_AUTH_CHECKED', () => {
		it('обновляет флаг isAuthChecked', () => {
			const state = authReducer(initialStateAuth, {
				type: SET_IS_AUTH_CHECKED,
				payload: true,
			});
			expect(state.isAuthChecked).toBe(true);
		});
	});
});
