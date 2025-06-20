import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
	Button,
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';

import { registerUser } from '../../components/services/actions/auth';

const RegisterPage = () => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleClick = () => {
		dispatch(registerUser(email, password, name));
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.inputContainer}>
				<h2 className='text text_type_main-medium'>Регистрация</h2>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleNameChange}
					value={name}
					name={'Имя'}
				/>
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
					Зарегистрироваться
				</Button>
			</div>
			<div className={styles.linkContainer}>
				<div className={styles.linkRow}>
					<p className='text text_type_main-default text_color_inactive'>
						Уже зарегистрированы?
					</p>
					<Link to='/login' className={`${styles.link}`}>
						<p className='text text_type_main-default ml-2'>Войти</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
