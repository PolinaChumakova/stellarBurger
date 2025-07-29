import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import {
	Button,
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';

import { registerUser } from '../../components/services/actions/auth';
import { useDispatch } from '@/utils/hooks';

const RegisterPage = () => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(registerUser(email, password, name));
	};

	return (
		<div className={styles.pageContainer}>
			<form className={styles.inputContainer} onSubmit={handleClick}>
				<h1 className='text text_type_main-medium'>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleNameChange}
					value={name}
					name={'name'}
					autoComplete='name'
				/>
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
					Зарегистрироваться
				</Button>
			</form>
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
