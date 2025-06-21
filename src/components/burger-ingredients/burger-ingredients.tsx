import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './burger-ingredients.module.css';

import { RootState } from '@/utils/types';
import { Preloader } from '../preloader/preloader';
import { IngredientItem } from './burger-ingredient';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerIngredients = (): React.JSX.Element => {
	const [activeTab, setActiveTab] = useState('bun');

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const bunRef = useRef<HTMLHeadingElement>(null);
	const sauceRef = useRef<HTMLHeadingElement>(null);
	const mainRef = useRef<HTMLHeadingElement>(null);

	const {
		burgerIngredients,
		burgerIngredientsRequest,
		burgerIngredientsFailed,
	} = useSelector((state: RootState) => state.burgerIngredients);

	const handleScroll = () => {
		if (
			!scrollContainerRef.current ||
			!bunRef.current ||
			!sauceRef.current ||
			!mainRef.current
		)
			return;

		const containerRect = scrollContainerRef.current.getBoundingClientRect();

		const bunOffset = Math.abs(
			bunRef.current.getBoundingClientRect().top - containerRect.top
		);
		const sauceOffset = Math.abs(
			sauceRef.current.getBoundingClientRect().top - containerRect.top
		);
		const mainOffset = Math.abs(
			mainRef.current.getBoundingClientRect().top - containerRect.top
		);

		const minOffset = Math.min(bunOffset, sauceOffset, mainOffset);

		if (minOffset === bunOffset) {
			setActiveTab('bun');
		} else if (minOffset === sauceOffset) {
			setActiveTab('main');
		} else {
			setActiveTab('sauce');
		}
	};

	return (
		<>
			{burgerIngredientsRequest && <Preloader />}
			{burgerIngredientsFailed && <p>Возникла ошибка</p>}
			{burgerIngredients?.length > 0 && (
				<section className={styles.burger_ingredients}>
					<nav>
						<ul className={styles.menu}>
							<Tab
								value='bun'
								active={activeTab === 'bun'}
								onClick={() => {
									setActiveTab('bun');
								}}>
								Булки
							</Tab>
							<Tab
								value='main'
								active={activeTab === 'main'}
								onClick={() => {
									setActiveTab('main');
								}}>
								Соусы
							</Tab>
							<Tab
								value='sauce'
								active={activeTab === 'sauce'}
								onClick={() => {
									setActiveTab('sauce');
								}}>
								Начинки
							</Tab>
						</ul>
					</nav>
					<div
						className={`mt-10 ${styles.ingredientsScrollContainer}`}
						ref={scrollContainerRef}
						onScroll={handleScroll}>
						<article>
							<h2 ref={bunRef} className='text text_type_main-medium mb-5'>
								Булки
							</h2>
							<div className={styles.ingredientsContainer}>
								{burgerIngredients
									.filter((item) => item.type === 'bun')
									.map((ingredient) => (
										<IngredientItem
											key={ingredient._id}
											ingredient={ingredient}
										/>
									))}
							</div>
						</article>
						<article>
							<h2
								ref={sauceRef}
								className='text text_type_main-medium mt-10 mb-5'>
								Соусы
							</h2>
							<div className={styles.ingredientsContainer}>
								{burgerIngredients
									.filter((item) => item.type === 'sauce')
									.map((ingredient) => (
										<IngredientItem
											key={ingredient._id}
											ingredient={ingredient}
										/>
									))}
							</div>
						</article>
						<article>
							<h2
								ref={mainRef}
								className='text text_type_main-medium mt-10 mb-5'>
								Начинки
							</h2>
							<div className={styles.ingredientsContainer}>
								{burgerIngredients
									.filter((item) => item.type === 'main')
									.map((ingredient) => (
										<IngredientItem
											key={ingredient._id}
											ingredient={ingredient}
										/>
									))}
							</div>
						</article>
					</div>
				</section>
			)}
		</>
	);
};
