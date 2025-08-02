import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';

import { loginUser } from '../../components/services/actions/auth';
import { useDispatch, useSelector } from '@/utils/hooks';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector((state) => state.auth.user);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(loginUser(email, password));
	};

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	return (
		<div className={styles.pageContainer}>
			<form className={styles.inputContainer} onSubmit={handleClick}>
				<h1 className='text text_type_main-medium'> Вход</h1>
				<EmailInput
					onChange={handleEmailChange}
					value={email}
					name={'email'}
					isIcon={false}
					autoComplete='email'
				/>
				<PasswordInput
					onChange={handlePasswordChange}
					value={password}
					name={'password'}
					extraClass='mb-2'
					autoComplete='password'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mb-20'>
					Войти
				</Button>
			</form>
			<div className={styles.linkContainer}>
				<div className={styles.linkRow}>
					<p className='text text_type_main-default text_color_inactive'>
						Вы — новый пользователь?
					</p>
					<Link to='/register' className={`${styles.link}`}>
						<p className='text text_type_main-default ml-2'>
							Зарегистрироваться
						</p>
					</Link>
				</div>
				<div className={styles.linkRow}>
					<p className='text text_type_main-default text_color_inactive'>
						Забыли пароль?
					</p>
					<Link to='/forgot-password' className={`${styles.link}`}>
						<p className='text text_type_main-default ml-2'>
							Восстановить пароль
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
