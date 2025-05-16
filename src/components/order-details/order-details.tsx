import Modal from '../modal/modal';
import styles from './order-details.module.css';
import iconCheck from './img/iconCheck.png';

type OrderDetailsProps = {
	onClose: () => void;
};

const OrderDetails = ({ onClose }: OrderDetailsProps) => {
	return (
		<Modal onClose={onClose}>
			<div className={styles.modalContent}>
				<p
					className='text text_type_digits-large '
					style={{ marginTop: '56px', WebkitTextStroke: '1px #4C4CFF' }}>
					034536
				</p>
				<p className='text text_type_main-medium mt-8 mb-15'>
					идентификатор заказа
				</p>
				<img
					src={iconCheck}
					alt='Иконка подтверждения заказа'
					className={styles.icon}
				/>
				<p className='text text_type_main-default mt-15 mb-2'>
					Ваш заказ начали готовить
				</p>
				<p className='text text_type_main-default text_color_inactive mb-20'>
					Дождитесь готовности на орбитальной станции
				</p>
			</div>
		</Modal>
	);
};

export default OrderDetails;
