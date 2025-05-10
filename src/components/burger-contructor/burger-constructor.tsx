import React from 'react';

import { TIngredient } from '@utils/types.ts';
import styles from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	console.log(ingredients);

	return (
		<section className={styles.burger_constructor}>
			<div className={styles.burgersIngredients}>
				<div className={styles.burgerIngredient} style={{ marginLeft: '32px' }}>
					<ConstructorElement
						type={'top'}
						isLocked={true}
						text={ingredients[0].name}
						price={ingredients[0].price}
						thumbnail={ingredients[0].image}
					/>
				</div>
				<div className={styles.burgerIngredientScroll}>
					{ingredients.slice(1, ingredients.length - 1).map((item) => (
						<div className={styles.burgerIngredient} key={item._id}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</div>
					))}
				</div>
				<div className={styles.burgerIngredient} style={{ marginLeft: '32px' }}>
					<ConstructorElement
						type={'bottom'}
						isLocked={true}
						text={ingredients[ingredients.length - 1].name}
						price={ingredients[ingredients.length - 1].price}
						thumbnail={ingredients[ingredients.length - 1].image}
					/>
				</div>
			</div>
			<div className={`${styles.buttonActions} p-4`}>
				<div className={styles.balance}>
					<p className='text text_type_digits-medium mr-2'>610</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='medium'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};
