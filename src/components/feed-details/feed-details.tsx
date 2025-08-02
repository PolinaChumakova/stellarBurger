import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@/utils/hooks';

import styles from './feed-details.module.css';

import { TIngredient } from '@/utils/types';
import { getOrderIngredients } from '../services/actions';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

const FeedDetails = () => {
	const dispatch = useDispatch();

	const { orderNumber } = useParams();

	const allOrders = useSelector((state) => state.allOrders.orders);
	const userOrders = useSelector((state) => state.userOrders.orders);
	const { burgerIngredientsMap } = useSelector(
		(state) => state.burgerIngredients
	);
	const { orderIngredients } = useSelector((state) => state.orderDetails); //заказ с сервера

	const order = useMemo(() => {
		return (
			[...allOrders, ...userOrders].find(
				(ing) => ing.number === Number(orderNumber)
			) || orderIngredients
		);
	}, [allOrders, userOrders, orderIngredients, orderNumber]);

	useEffect(() => {
		if ((!order && orderNumber) || order?.number !== Number(orderNumber)) {
			dispatch(getOrderIngredients(Number(orderNumber)));
		}
	}, [order, orderNumber, dispatch]);

	const ingredientMap = new Map<string, TIngredient>();
	const ingredientCounts: Record<string, number> = {};

	order?.ingredients.forEach((id) => {
		const item = burgerIngredientsMap[id];
		if (item) {
			if (!ingredientMap.has(item._id)) {
				ingredientMap.set(item._id, item);
			}
			ingredientCounts[item._id] = (ingredientCounts[item._id] || 0) + 1;
		}
	});

	const validateIngredients = Array.from(ingredientMap.values());

	const totalPrice = validateIngredients.reduce(
		(sum, item) => sum + item.price * ingredientCounts[item._id],
		0
	);

	const getStatusName = (status: string) => {
		switch (status) {
			case 'done':
				return 'Выполнен';
			case 'created':
				return 'Создан';
			case 'pending':
				return 'Готовится';
			default:
				return '';
		}
	};

	if (order) {
		return (
			<div className={styles.feedContainer}>
				<div className={styles.number}>
					<p className='text text_type_digits-default mb-10'>#{order.number}</p>
				</div>

				<p className='text text_type_main-medium mb-3'> {order.name}</p>
				<p
					className={`${order.status === 'done' ? styles.status : ''} text text_type_main-default mb-15`}>
					{' '}
					{getStatusName(order.status)}
				</p>
				<p className='text text_type_main-medium mb-6'> Состав: </p>
				<div>
					<div className={styles.ingredientsContainer}>
						{validateIngredients?.map((ingredient) => {
							const count =
								ingredientCounts && ingredientCounts[ingredient._id];
							return (
								<div className={styles.ingredient} key={ingredient._id}>
									<div className={styles.ingredientIconName}>
										<div className={styles.ingredientIconContainer}>
											<img
												src={ingredient.image_mobile}
												alt={ingredient.name}
												className={styles.ingredientIcon}
											/>
										</div>
										<p className='text text_type_main-default'>
											{' '}
											{ingredient.name}
										</p>
									</div>

									<div className={styles.price}>
										<p className='text text_type_digits-default mr-2'>
											{count} x {ingredient.price}
										</p>
										<CurrencyIcon type='primary' />
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.dateSum}>
					<p className='text text_type_main-default text_color_inactive'>
						<FormattedDate date={new Date(order.createdAt)} />
					</p>
					<div className={styles.price}>
						<p className='text text_type_digits-default mr-2'>{totalPrice}</p>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		);
	} else {
		<p className='text text_type_main-default text_color_inactive'>
			Возникла ошибка - попробуйте снова
		</p>;
	}
};

export default FeedDetails;
