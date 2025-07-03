import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

import {
	HomePage,
	LoginPage,
	ProfileUser,
	ProfilePage,
	RegisterPage,
	NotFoundPage,
	ResetPasswordPage,
	ForgotPasswordPage,
} from '@/pages';
import Modal from '../modal/modal';

import { checkUserAuth } from '@components/services/actions/auth';
import IngredientDetails from '../ingredient-details/ingredient-details';

export const App = (): React.JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const background = location.state && location.state.background;

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch]);

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<div className={styles.app}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/ingredients/:ingredientId'
					element={
						<div className={styles.pageContainer}>
							<IngredientDetails />
						</div>
					}
				/>
				<Route
					path='/login'
					element={<OnlyUnAuth component={<LoginPage />} />}
				/>
				<Route
					path='/profile'
					element={<OnlyAuth component={<ProfilePage />} />}>
					<Route index element={<ProfileUser />} />
					<Route
						path='orders'
						element={
							<p className='text text_type_main-default mt-4 '>
								Вы находитесь в разделе истории заказов.
							</p>
						}
					/>
					<Route path='logout' element={<></>} />
				</Route>
				<Route
					path='/register'
					element={<OnlyUnAuth component={<RegisterPage />} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnAuth component={<ResetPasswordPage />} />}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
