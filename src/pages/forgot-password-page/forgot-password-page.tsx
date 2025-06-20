import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';

import { loadForgotPassword } from '@/utils/api';
import { Preloader } from '@/components/preloader/preloader';

const ForgotPasswordPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleForgotPassword = () => {
		setIsLoading(true);
		setError(false);

		loadForgotPassword(email)
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
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.inputContainer}>
				<h2 className='text text_type_main-medium'>Восстановление пароля</h2>
				<EmailInput
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={'email'}
					isIcon={false}
					placeholder='Укажите e-mail'
				/>
				{isLoading ? (
					<Preloader />
				) : (
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='mb-10'
						onClick={handleForgotPassword}>
						Восстановить
					</Button>
				)}
				{error && (
					<p className='text text_type_main-default'>
						Ошибка при восстановлении пароля
					</p>
				)}
			</div>
			<div className={styles.linkContainer}>
				<div className={`mt-10 ${styles.linkRow}`}>
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

export default ForgotPasswordPage;
