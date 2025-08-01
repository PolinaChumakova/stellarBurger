import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import styles from './app.module.css';
import { FeedBurgers } from '../feed-burgers/feed-burgers';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

import {
	HomePage,
	FeedPage,
	LoginPage,
	ProfileUser,
	ProfilePage,
	RegisterPage,
	NotFoundPage,
	ResetPasswordPage,
	ForgotPasswordPage,
} from '@/pages';
import Modal from '../modal/modal';

import { checkUserAuth } from '@/components/services/actions/auth';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from '@/utils/hooks';
import FeedDetails from '../feed-details/feed-details';
import { getBurgerIngredients } from '../services/actions';

export const App = (): React.JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const background = location.state && location.state.background;

	useEffect(() => {
		dispatch(checkUserAuth());
		dispatch(getBurgerIngredients());
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
					path='/feed/:orderNumber'
					element={
						<div className={styles.pageContainer}>
							<FeedDetails />
						</div>
					}
				/>
				<Route
					path='/login'
					element={<OnlyUnAuth component={<LoginPage />} />}
				/>
				<Route path='/feed' element={<FeedPage />} />
				<Route
					path='/profile'
					element={<OnlyAuth component={<ProfilePage />} />}>
					<Route index element={<ProfileUser />} />
					<Route path='orders' element={<FeedBurgers isUser={true} />} />
					{/* <Route
						path="orders/:orderNumber" 
						element={
						<div className={styles.pageContainer}>
							<FeedDetails />
						</div>
					} 
					/> */}
					<Route path='logout' element={<></>} />
				</Route>
				<Route
					path='/profile/orders/:orderNumber'
					element={
						<div className={styles.pageContainer}>
							<FeedDetails />
						</div>
					}
				/>

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
							<Modal header='Детали ингредиента' onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/feed/:orderNumber'
						element={
							<Modal onClose={handleModalClose}>
								<FeedDetails />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:orderNumber'
						element={
							<Modal onClose={handleModalClose}>
								<FeedDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
