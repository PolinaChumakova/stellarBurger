import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	Button,
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-page.module.css';

import { RootState } from '@/utils/types';
import { updateUser } from '../../components/services/actions/auth';

const ProfileUser = () => {
	const dispatch = useDispatch();

	const userAuth = useSelector((state: RootState) => state.auth.user);

	const [name, setName] = useState(userAuth.name);
	const [email, setEmail] = useState(userAuth.email);
	const [password, setPassword] = useState('');

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(updateUser(name, email, password));
	};
	const handleClose = () => {
		setName(userAuth.name);
		setEmail(userAuth.email);
		setPassword('');
	};
	const isEdit =
		name !== userAuth.name || email !== userAuth.email || password !== '';

	return (
		<>
			<form onSubmit={handleClick} className={styles.inputContainer}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => setName(e.target.value)}
					value={name}
					icon='EditIcon'
					name={'name'}
					autoComplete='name'
				/>
				<EmailInput
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={'email'}
					isIcon={true}
					autoComplete='email'
				/>
				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					extraClass='mb-2'
					icon='EditIcon'
					autoComplete='password'
				/>
				{isEdit && (
					<div>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							extraClass='mb-20'
							onClick={handleClose}>
							Отмена
						</Button>
						<Button
							htmlType='submit'
							type='primary'
							size='medium'
							extraClass='mb-20'>
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</>
	);
};

export default ProfileUser;
