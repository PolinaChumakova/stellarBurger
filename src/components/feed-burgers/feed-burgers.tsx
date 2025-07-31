import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '@/utils/hooks';

import styles from './feed-burgers.module.css';
import { TIngredient } from '@/utils/types';

import {
	wsUserConnectionStart,
	wsUserConnectionStop,
} from '../services/actions/ws-actions';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface IFeedBurgersProps {
	isUser: boolean;
}

export const FeedBurgers = ({
	isUser,
}: IFeedBurgersProps): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		isUser && dispatch(wsUserConnectionStart());

		return () => {
			isUser && dispatch(wsUserConnectionStop());
		};
	}, [dispatch]);

	const orders = useSelector((state) => {
		if (isUser) {
			return state.userOrders.orders;
		} else {
			return state.allOrders.orders;
		}
	});

	const { burgerIngredientsMap } = useSelector(
		(state) => state.burgerIngredients
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

	return (
		<>
			{orders.map((order) => {
				const validateIngredients = order.ingredients
					.map((id) => burgerIngredientsMap[id])
					.filter((item): item is TIngredient => !!item);

				const totalPrice = validateIngredients.reduce(
					(sum, item) => sum + item.price,
					0
				);

				return (
					<Link
						key={order._id}
						to={
							isUser
								? `/profile/orders/${order.number}`
								: `/feed/${order.number}`
						}
						state={{ background: location }}
						className={styles.ingredientLink}>
						<div className={styles.feedContainer}>
							<div className={styles.numberDateContainer}>
								<p className='text text_type_digits-default'>#{order.number}</p>
								<p className='text text_type_main-default text_color_inactive'>
									<FormattedDate date={new Date(order.createdAt)} />
								</p>
							</div>
							{isUser && (
								<p
									className={`${order.status === 'done' && styles.status} text text_type_main-default`}>
									{' '}
									{getStatusName(order.status)}
								</p>
							)}
							<p className='text text_type_main-medium'> {order.name}</p>
							<div className={styles.picPriceContainer}>
								<div className={styles.ingredientIcons}>
									{validateIngredients.slice(0, 6).map((item, index) => {
										const numberOfRestIcons = validateIngredients.length - 6;
										const isLastIcon = index === 5;

										return (
											<div
												className={styles.ingredientIconContainer}
												key={index}>
												<img
													src={item.image_mobile}
													alt={item.name}
													className={styles.ingredientIcon}
												/>
												{numberOfRestIcons > 0 && isLastIcon && (
													<div className={styles.numberOverlay}>
														<span className={styles.number}>
															<p className='text text_type_main-default'>
																+{numberOfRestIcons}
															</p>
														</span>
													</div>
												)}
											</div>
										);
									})}
								</div>
								<div className={styles.price}>
									<p className='text text_type_digits-default mr-2'>
										{totalPrice}
									</p>
									<CurrencyIcon type='primary' />
								</div>
							</div>
						</div>
					</Link>
				);
			})}
		</>
	);
};
