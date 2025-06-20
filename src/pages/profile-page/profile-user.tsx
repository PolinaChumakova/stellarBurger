import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	Button,
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { RootState } from '@/utils/types';
import { getUser } from '../../components/services/actions/auth';

const ProfileUser = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const userAuth = useSelector((state: RootState) => state.auth.user);

	const [userEdit, setUserEdit] = useState(userAuth);

	return (
		<>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => setUserEdit({ ...userEdit, name: e.target.value })}
				value={userEdit?.name}
				name={'Имя'}
				icon='EditIcon'
			/>
			<EmailInput
				onChange={(e) => setUserEdit({ ...userEdit, email: e.target.value })}
				value={userEdit?.email}
				name={'email'}
				isIcon={true}
			/>
			<PasswordInput
				onChange={() => console.log('aaa')}
				value={''}
				name={'password'}
				extraClass='mb-2'
			/>
			<div>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass='mb-20'>
					Отмена
				</Button>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					extraClass='mb-20'>
					Сохранить
				</Button>
			</div>
		</>
	);
};

export default ProfileUser;
