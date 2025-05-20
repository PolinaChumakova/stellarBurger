import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
// import { ingredients } from '@utils/ingredients.ts';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';

export const App = (): React.JSX.Element => {
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		const getProductData = () => {
			const baseURL = 'https://norma.nomoreparties.space/api/ingredients';

			fetch(baseURL)
				.then((res) => {
								  if (res.ok) {
									  return res.json();
								  }
								  return Promise.reject(`Ошибка ${res.status}`);
							  })
				.then((data) => {
					setIngredients(data.data);
				})
				.catch(() => {
					console.log('Произошла ошибка');
				});
		};

		getProductData();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			{ingredients.length && (
				<main className={`${styles.main} pl-5 pr-5`}>
					<BurgerIngredients ingredients={ingredients} />
					<BurgerConstructor ingredients={ingredients} />
				</main>
			)}
		</div>
	);
};

export default App;
