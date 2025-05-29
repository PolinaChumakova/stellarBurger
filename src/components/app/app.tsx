import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';

import { getBurgerIngredients } from '@components/services/actions';
import { rootReducer } from '@components/services/reducers';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export type RootState = ReturnType<typeof rootReducer>;

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBurgerIngredients());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<DndProvider backend={HTML5Backend}>
				<main className={`${styles.main} pl-5 pr-5`}>
					<div className={styles.burgerContainer}>
						<BurgerIngredients />
					</div>
					<div className={styles.burgerContainer}>
						<BurgerConstructor />
					</div>
				</main>
			</DndProvider>
		</div>
	);
};

export default App;
