import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getBurgerIngredients } from '@components/services/actions';
import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';

import styles from './home-page.module.css';

const HomePage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBurgerIngredients());
	}, [dispatch]);
	return (
		<>
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
		</>
	);
};

export default HomePage;
