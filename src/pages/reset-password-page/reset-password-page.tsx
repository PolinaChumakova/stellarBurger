import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password-page.module.css';
import { loadResetPassword } from '@/utils/api';
import { Preloader } from '@/components/preloader/preloader';

const ResetPasswordPage = () => {
	const navigate = useNavigate();

	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const isResetPassword = localStorage.getItem('isResetPassword');

		if (!isResetPassword) {
			navigate('/forgot-password');
		}

		return () => {
			localStorage.removeItem('isResetPassword');
		};
	}, [navigate]);

	const handleResetPassword = () => {
		setIsLoading(true);
		setError(false);

		loadResetPassword(password, code)
			.then((res) => {
				if (res && res.success) {
					localStorage.setItem('isResetPassword', 'true');
					navigate('/reset-password');
				} else {
					setError(true);
				}
			})
			.catch(() => {
				setIsLoading(false);
				setError(true);
			});
		localStorage.removeItem('isResetPassword');
		navigate('/login');
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.inputContainer}>
				<h2 className='text text_type_main-medium'>Восстановление пароля</h2>
				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					extraClass='mb-2'
					placeholder='Введите новый пароль'
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={(e) => setCode(e.target.value)}
					value={code}
					name={'Имя'}
				/>
				{isLoading ? (
					<Preloader />
				) : (
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='mb-20'
						onClick={handleResetPassword}>
						Сохранить
					</Button>
				)}
				{error && (
					<p className='text text_type_main-default'>
						Ошибка при восстановлении пароля
					</p>
				)}
			</div>
			<div className={styles.linkContainer}>
				<div className={styles.linkRow}>
					<p className='text text_type_main-default text_color_inactive'>
						Вспомнили пароль?
					</p>
					<Link to='/login' className={`${styles.link}`}>
						<p className='text text_type_main-default ml-2'>Войти</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
