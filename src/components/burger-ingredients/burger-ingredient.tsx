import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { RootState } from '@/utils/types';
import { useSelector } from 'react-redux';

import styles from './burger-ingredients.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientItem = ({ ingredient, handleIngredientClick }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const { bun, ingredients } = useSelector(
		(state: RootState) => state.burgerConstructor
	);

	const counts = useMemo(() => {
		if (ingredient.type === 'bun') {
			return bun && bun._id === ingredient._id ? 2 : 0;
		}
		return ingredients.filter((item) => item._id === ingredient._id).length;
	}, [bun, ingredients, ingredient._id, ingredient.type]);

	return (
		<div
			ref={dragRef}
			className={styles.burgerIngredient}
			role='button'
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					handleIngredientClick(ingredient);
				}
			}}
			onClick={() => handleIngredientClick(ingredient)}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			<img src={ingredient.image} alt={ingredient.name} />
			<div className={styles.price}>
				<p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
				<CurrencyIcon type='primary' />
			</div>
			{ingredient.name}
			{counts !== 0 && (
				<Counter count={counts} size='default' extraClass='m-1' />
			)}
		</div>
	);
};
