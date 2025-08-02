import { useEffect } from 'react';

import styles from './feed-page.module.css';
import { useDispatch, useSelector } from '@/utils/hooks';
import { FeedBurgers } from '@/components/feed-burgers/feed-burgers';
import {
	wsAllConnectionStart,
	wsAllConnectionStop,
} from '@/components/services/actions/ws-actions';

const FeedPage = (): React.JSX.Element => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsAllConnectionStart());

		return () => {
			dispatch(wsAllConnectionStop());
		};
	}, [dispatch]);

	const { orders, total, totalToday } = useSelector((state) => state.allOrders);

	const totalDigits = String(total).split('');
	const totalTodayDigits = String(totalToday).split('');

	return (
		<>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Лента заказов
			</h1>
			<div className={styles.main}>
				<div className={styles.feedAndInfoContainer}>
					<FeedBurgers isUser={false} />
				</div>
				<div className={styles.feedAndInfoContainer}>
					<div className={styles.numberStatusesContainer}>
						<div className={styles.statusContainer}>
							<p className='text text_type_main-medium mb-6'> Готовы:</p>
							<div className={styles.numbersContainer}>
								{orders.slice(0, 10).map(
									(order) =>
										order.status === 'done' && (
											<div key={order._id}>
												<p
													className={`${styles.number} text text_type_digits-default`}>
													{order.number}
												</p>
											</div>
										)
								)}
							</div>
						</div>
						<div className={styles.statusContainer}>
							<p className='text text_type_main-medium mb-6'> В работе:</p>
							<div className={styles.numbersContainer}>
								{orders.slice(0, 10).map(
									(order) =>
										order.status === 'pending' && (
											<div key={order._id}>
												<p
													className={`${styles.number} text text_type_digits-default`}>
													{order.number}
												</p>
											</div>
										)
								)}
							</div>
						</div>
					</div>

					<div>
						<p className='text text_type_main-medium mt-15'>
							Выполнено за все время:
						</p>
						<p className='text text_type_digits-large'>
							{totalDigits.map((digit, index) => (
								<span key={index} className={styles.digits}>
									{digit}
								</span>
							))}
						</p>
					</div>
					<div>
						<p className='text text_type_main-medium mt-15'>
							Выполнено за сегодня:
						</p>
						<p className='text text_type_digits-large'>
							{totalTodayDigits.map((digit, index) => (
								<span key={index} className={styles.digits}>
									{digit}
								</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default FeedPage;
