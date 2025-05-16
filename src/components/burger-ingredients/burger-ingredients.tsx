import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import {
	Counter,
	CurrencyIcon,
	Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

type Counts = {
	[key: string]: number;
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	// console.log(ingredients);

	const [counts, setCounts] = useState<Counts>({});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedIngredient, setSelectedIngredient] = useState<TIngredient>();

	const handleIngredientClick = (ingredient: TIngredient) => {
		setCounts((prevCounts) => ({
			...prevCounts,
			[ingredient._id]: (prevCounts[ingredient._id] || 0) + 1,
		}));
		setIsOpen(true);
		setSelectedIngredient(ingredient);
	};

	return (
		<>
			<section className={styles.burger_ingredients}>
				<nav>
					<ul className={styles.menu}>
						<Tab value='bun' active={true} onClick={() => {}}>
							Булки
						</Tab>
						<Tab value='main' active={false} onClick={() => {}}>
							Соусы
						</Tab>
						<Tab value='sauce' active={false} onClick={() => {}}>
							Начинки
						</Tab>
					</ul>
				</nav>
				<div className='mt-10' style={{ height: '65vh', overflowY: 'auto' }}>
					<article>
						<h2 className='text text_type_main-medium mb-5'>Булки</h2>
						<div className={styles.ingredientsContainer}>
							{ingredients
								.filter((item) => item.type === 'bun')
								.map((ingredient) => (
									<div
										key={ingredient._id}
										className={styles.burgerIngredient}
										role='button'
										tabIndex={0}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												handleIngredientClick(ingredient);
											}
										}}
										onClick={() => handleIngredientClick(ingredient)}>
										<img src={ingredient.image} alt={ingredient.name} />
										<div className={styles.price}>
											<p className='text text_type_digits-default mr-2'>
												{ingredient.price}
											</p>
											<CurrencyIcon type='primary' />
										</div>
										{ingredient.name}
										{counts[ingredient._id] && (
											<Counter
												count={counts[ingredient._id]}
												size='default'
												extraClass='m-1'
											/>
										)}
									</div>
								))}
						</div>
					</article>
					<article>
						<h2 className='text text_type_main-medium mt-10 mb-5'>Соусы</h2>
						<div className={styles.ingredientsContainer}>
							{ingredients
								.filter((item) => item.type === 'sauce')
								.map((ingredient) => (
									<div
										key={ingredient._id}
										className={styles.burgerIngredient}
										role='button'
										tabIndex={0}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												handleIngredientClick(ingredient);
											}
										}}
										onClick={() => handleIngredientClick(ingredient)}>
										<img src={ingredient.image} alt={ingredient.name} />
										<div className={styles.price}>
											<p className='text text_type_digits-default mr-2'>
												{ingredient.price}
											</p>
											<CurrencyIcon type='primary' />
										</div>
										{ingredient.name}
										{counts[ingredient._id] && (
											<Counter
												count={counts[ingredient._id]}
												size='default'
												extraClass='m-1'
											/>
										)}
									</div>
								))}
						</div>
					</article>
					<article>
						<h2 className='text text_type_main-medium mt-10 mb-5'>Начинки</h2>
						<div className={styles.ingredientsContainer}>
							{ingredients
								.filter((item) => item.type === 'main')
								.map((ingredient) => (
									<div
										key={ingredient._id}
										className={styles.burgerIngredient}
										role='button'
										tabIndex={0}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												handleIngredientClick(ingredient);
											}
										}}
										onClick={() => handleIngredientClick(ingredient)}>
										<img src={ingredient.image} alt={ingredient.name} />
										<div className={styles.price}>
											<p className='text text_type_digits-default mr-2'>
												{ingredient.price}
											</p>
											<CurrencyIcon type='primary' />
										</div>
										{ingredient.name}
										{counts[ingredient._id] && (
											<Counter
												count={counts[ingredient._id]}
												size='default'
												extraClass='m-1'
											/>
										)}
									</div>
								))}
						</div>
					</article>
					{isOpen && selectedIngredient && (
						<IngredientDetails
							ingredient={selectedIngredient}
							onClose={() => setIsOpen(false)}
						/>
					)}
				</div>
			</section>
		</>
	);
};
