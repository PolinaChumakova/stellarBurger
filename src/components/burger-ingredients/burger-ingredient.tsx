import { FC, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { RootState, TIngredient } from '@/utils/types';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './burger-ingredients.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface IIngredientItemProps {
	ingredient: TIngredient;
}

export const IngredientItem: FC<IIngredientItemProps> = ({ ingredient }) => {
	const location = useLocation();

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
		return ingredients.filter(
			(item: TIngredient) => item._id === ingredient._id
		).length;
	}, [bun, ingredients, ingredient._id, ingredient.type]);

	return (
		<div
			ref={dragRef}
			className={styles.burgerIngredient}
			role='button'
			tabIndex={0}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			<Link
				key={ingredient._id}
				to={`/ingredients/${ingredient._id}`}
				state={{ background: location }}
				className={styles.ingredientLink}>
				<img src={ingredient.image} alt={ingredient.name} />
				<div className={styles.price}>
					<p className='text text_type_digits-default mr-2'>
						{ingredient.price}
					</p>
					<CurrencyIcon type='primary' />
				</div>
				{ingredient.name}
				{counts !== 0 && (
					<Counter count={counts} size='default' extraClass='m-1' />
				)}
			</Link>
		</div>
	);
};
