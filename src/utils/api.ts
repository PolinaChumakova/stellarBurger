export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const AUTH_URL = 'https://norma.nomoreparties.space/api/auth';
export const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

interface ILoginResponse {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	message: string;
	refreshToken: string;
	accessToken: string;
}

export function checkResponse(res: Response) {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = () => {
	return (
		fetch(`${AUTH_URL}/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		})
			.then(checkResponse)
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			})
	);
};

export const fetchWithRefresh = async <T>(
	url: string,
	options: RequestInit
): Promise<T> => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			(options.headers as Record<string, string>).authorization =
				refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return (await checkResponse(res)) as T;
		} else {
			return Promise.reject(err);
		}
	}
};

export const loadForgotPassword = (email: string) =>
	fetch(`${BASE_URL}/password-reset`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: email }),
	}).then(checkResponse);

export const loadResetPassword = (password: string, token: string) =>
	fetch(`${BASE_URL}/password-reset/reset`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			password: password,
			token: token,
		}),
	}).then(checkResponse);

export const apiRegisterUser = (
	email: string,
	password: string,
	name: string
) => {
	return fetchWithRefresh<ILoginResponse>(`${AUTH_URL}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email: email, password: password, name: name }),
	});
};

export const apiLoginUser = (email: string, password: string) => {
	return fetchWithRefresh<ILoginResponse>(`${AUTH_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email: email, password: password }),
	});
};

export const apiGetUser = () => {
	return fetchWithRefresh<ILoginResponse>(`${AUTH_URL}/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('accessToken') || '',
		},
	});
};

export const apiUpdateUser = (
	name: string,
	email: string,
	password: string
) => {
	return fetchWithRefresh<ILoginResponse>(`${AUTH_URL}/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify({ name, email, password }),
	});
};

export const apiLogoutUser = () => {
	return fetch(`${AUTH_URL}/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	}).then(checkResponse);
};
