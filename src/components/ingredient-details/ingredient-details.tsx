import { useSelector } from 'react-redux';

import Modal from '../modal/modal';
import { RootState } from '@utils/types.ts';
import styles from './ingredient-details.module.css';

type IngredientDetailsProps = {
	onClose: () => void;
};

const IngredientDetails = ({ onClose }: IngredientDetailsProps) => {
	const ingredient = useSelector(
		(state: RootState) => state.ingredientDetails.ingredientDetails
	);

	return (
		<Modal header='Детали ингредиента' onClose={onClose}>
			<div className={styles.modalContent}>
				<img
					src={ingredient?.image}
					alt={ingredient?.name}
					className={styles.image}
				/>
				<p className='text text_type_main-medium mb-8 mt-4'>
					{ingredient?.name}
				</p>
				<div className={styles.detailsContainer}>
					<div>
						<p className='text text_type_main-default text_color_inactive'>
							{' '}
							Калории,ккал
						</p>
						<p className='text text_type_digits-default text_color_inactive'>
							{ingredient?.calories}
						</p>
					</div>
					<div>
						<p className='text text_type_main-default text_color_inactive'>
							{' '}
							Белки, г
						</p>
						<p className='text text_type_digits-default text_color_inactive'>
							{ingredient?.proteins}
						</p>
					</div>
					<div>
						<p className='text text_type_main-default text_color_inactive'>
							{' '}
							Жиры, г
						</p>
						<p className='text text_type_digits-default text_color_inactive'>
							{ingredient?.fat}
						</p>
					</div>
					<div>
						<p className='text text_type_main-default text_color_inactive'>
							{' '}
							Углеводы, г
						</p>
						<p className='text text_type_digits-default text_color_inactive'>
							{ingredient?.carbohydrates}
						</p>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default IngredientDetails;
