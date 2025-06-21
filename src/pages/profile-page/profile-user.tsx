import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	Button,
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { RootState } from '@/utils/types';
import { updateUser } from '../../components/services/actions/auth';

const ProfileUser = () => {
	const dispatch = useDispatch();

	const userAuth = useSelector((state: RootState) => state.auth.user);

	const [name, setName] = useState(userAuth.name);
	const [email, setEmail] = useState(userAuth.email);
	const [password, setPassword] = useState('');

	const handleClick = () => {
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
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => setName(e.target.value)}
				value={name}
				icon='EditIcon'
			/>
			<EmailInput
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				name={'email'}
				isIcon={true}
			/>
			<PasswordInput
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				name={'password'}
				extraClass='mb-2'
				icon='EditIcon'
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
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='mb-20'
						onClick={handleClick}>
						Сохранить
					</Button>
				</div>
			)}
		</>
	);
};

export default ProfileUser;
