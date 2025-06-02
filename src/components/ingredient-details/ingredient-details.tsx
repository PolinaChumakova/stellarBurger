import styles from './ingredient-details.module.css';

const IngredientDetails = ({ currentIngredient }) => {
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
