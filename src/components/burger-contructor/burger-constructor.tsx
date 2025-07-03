import React, { useMemo, useState } from 'react';

import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, TIngredient } from '@utils/types.ts';
import styles from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import { Preloader } from '../preloader/preloader';
import OrderDetails from '../order-details/order-details';
import { BurgerConstructorIngredient } from './burger-constructor-ingredient';

// @ts-expect-error Could not find a declaration file
import {
	setBurgerConstructor,
	deleteBurgerConstructor,
	getOrderDetails,
} from '../services/actions';

export const BurgerConstructor = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { bun, ingredients } = useSelector(
		(state: RootState) => state.burgerConstructor
	);
	const { orderDetails, orderDetailsFailed, orderDetailsRequest } = useSelector(
		(state: RootState) => state.orderDetails
	);

	const totalCost = useMemo(() => {
		const ingredientsSum =
			ingredients?.reduce(
				(sum: number, ing: TIngredient) => sum + (ing.price || 0),
				0
			) || 0;
		const bunPrice = bun?.price || 0;
		return ingredientsSum + bunPrice * 2;
	}, [ingredients, bun]);

	const constructorIds = useMemo(() => {
		const ingredientIds: string[] = [];
		bun && ingredientIds.push(bun._id);

		const ingredientIdsFromIngredients = ingredients?.map(
			(ingredient: TIngredient) => ingredient._id
		);
		ingredientIds.push(...ingredientIdsFromIngredients);

		bun && ingredientIds.push(bun._id);

		return ingredientIds;
	}, [bun, ingredients]);

	const handleButtonClick = () => {
		setIsOpen(true);

		if (localStorage.getItem('accessToken')) {
			dispatch(getOrderDetails(constructorIds));
		} else {
			navigate('/login');
		}
	};

	const handleDeleteIngredient = (id: number) => {
		dispatch(deleteBurgerConstructor(id));
	};

	const [{ isOverBun }, dropRefBun] = useDrop({
		accept: 'bun',
		drop: (item) => {
			dispatch(setBurgerConstructor(item));
		},
		collect: (monitor) => ({
			isOverBun: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const [{ isOverIng }, dropRefIng] = useDrop({
		accept: 'ingredient',
		drop: (item) => {
			dispatch(setBurgerConstructor(item));
		},
		collect: (monitor) => ({
			isOverIng: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const borderColorBun = isOverBun ? '#4c4cff' : 'transparent';
	const borderColorBIng = isOverIng ? '#4c4cff' : 'transparent';

	return (
		<section className={styles.burger_constructor}>
			<>
				<div ref={dropRefBun} className={styles.burgersIngredients}>
					{bun ? (
						<div
							className={styles.burgerIngredient}
							style={{ marginLeft: '32px' }}>
							<ConstructorElement
								type={'top'}
								isLocked={true}
								text={bun.name}
								price={bun.price}
								thumbnail={bun.image}
							/>
						</div>
					) : (
						<div className={styles.emptyIngredients}>
							<div
								style={{ borderColor: borderColorBun }}
								className={`${styles.emptyContainer} ${styles.emptyBunStart}`}>
								<p className='text text_type_main-small'>Выберите булку</p>
							</div>
						</div>
					)}
					{ingredients.length > 0 ? (
						<div ref={dropRefIng} className={styles.burgerIngredientScroll}>
							{ingredients.map((item: TIngredient, index: number) => (
								<BurgerConstructorIngredient
									key={item.uniqueId}
									ingredient={item}
									handleDeleteIngredient={handleDeleteIngredient}
									index={index}
								/>
							))}
						</div>
					) : (
						<div className={styles.emptyIngredients}>
							<div
								ref={dropRefIng}
								style={{ borderColor: borderColorBIng }}
								className={`${styles.emptyContainer}`}>
								<p className='text text_type_main-small'>Выберите начинку</p>
							</div>
						</div>
					)}
					{bun ? (
						<div
							className={styles.burgerIngredient}
							style={{ marginLeft: '32px' }}>
							<ConstructorElement
								type={'bottom'}
								isLocked={true}
								text={bun.name}
								price={bun.price}
								thumbnail={bun.image}
							/>
						</div>
					) : (
						<div className={styles.emptyIngredients}>
							<div
								style={{ borderColor: borderColorBun }}
								className={`${styles.emptyContainer} ${styles.emptyBunFinish}`}>
								<p className='text text_type_main-small'>Выберите булку</p>
							</div>
						</div>
					)}
				</div>

				<div className={`${styles.buttonActions} mt-10 mr-8`}>
					<div className={styles.balance}>
						<p className='text text_type_digits-medium mr-2'>{totalCost}</p>
						<CurrencyIcon type='primary' />
					</div>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						onClick={handleButtonClick}>
						Оформить заказ
					</Button>
				</div>
				{isOpen && (
					<Modal onClose={() => setIsOpen(false)}>
						<>
							{orderDetailsRequest && (
								<>
									{' '}
									<p className='text text_type_main-medium mt-8 mb-15'>
										{' '}
										Оформляем заказ...
									</p>
									<Preloader />{' '}
								</>
							)}
							{orderDetailsFailed && (
								<p className='text text_type_main-medium mt-8 mb-15'>
									Возникла ошибка
								</p>
							)}
							{orderDetails && (
								<OrderDetails orderDetails={orderDetails.number} />
							)}
						</>
					</Modal>
				)}
			</>
		</section>
	);
};
