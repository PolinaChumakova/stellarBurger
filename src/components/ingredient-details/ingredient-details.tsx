import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ingredient-details.module.css';

import { RootState } from '@/utils/types';
import { Preloader } from '../preloader/preloader';
import { getBurgerIngredients } from '@components/services/actions';

const IngredientDetails = () => {
	const dispatch = useDispatch();

	const { ingredientId } = useParams();
	const { burgerIngredients } = useSelector(
		(state: RootState) => state.burgerIngredients
	);

	useEffect(() => {
		if (!burgerIngredients || burgerIngredients.length === 0) {
			dispatch(getBurgerIngredients());
		}
	}, [dispatch, burgerIngredients]);

	const currentIngredient = burgerIngredients?.find(
		(ing) => ing._id === ingredientId
	);

	if (
		!currentIngredient ||
		!burgerIngredients ||
		burgerIngredients.length === 0
	) {
		return <Preloader />;
	}

	return (
		<div className={styles.ingredientContent}>
			<img
				src={currentIngredient?.image}
				alt={currentIngredient?.name}
				className={styles.image}
			/>
			<p className='text text_type_main-medium mb-8 mt-4'>
				{currentIngredient?.name}
			</p>
			<div className={styles.detailsContainer}>
				<div>
					<p className='text text_type_main-default text_color_inactive'>
						{' '}
						Калории,ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentIngredient?.calories}
					</p>
				</div>
				<div>
					<p className='text text_type_main-default text_color_inactive'>
						{' '}
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentIngredient?.proteins}
					</p>
				</div>
				<div>
					<p className='text text_type_main-default text_color_inactive'>
						{' '}
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentIngredient?.fat}
					</p>
				</div>
				<div>
					<p className='text text_type_main-default text_color_inactive'>
						{' '}
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{currentIngredient?.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};

export default IngredientDetails;
