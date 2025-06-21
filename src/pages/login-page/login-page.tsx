import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';

import { loginUser } from '../../components/services/actions/auth';
import { RootState } from '@/utils/types';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector((state: RootState) => state.auth.user);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleClick = async () => {
		await dispatch(loginUser(email, password));
		if (user) {
			navigate('/');
		}
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.inputContainer}>
				<h2 className='text text_type_main-medium'> Вход</h2>
				<EmailInput
					onChange={handleEmailChange}
					value={email}
					name={'email'}
					isIcon={false}
				/>
				<PasswordInput
					onChange={handlePasswordChange}
					value={password}
					name={'password'}
					extraClass='mb-2'
				/>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='mb-20'
					onClick={handleClick}>
					Войти
				</Button>
			</div>
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
