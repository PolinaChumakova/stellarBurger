import { ReactNode, useEffect } from 'react';

import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalProps = {
	children?: ReactNode;
	header?: string;
	onClose: () => void;
};

const Modal = ({ children, header, onClose }: TModalProps) => {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape' || event.key === 'Esc') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEsc);

		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	return (
		<>
			<ModalOverlay onClose={onClose} />
			<div className={styles.modal}>
				<div className={styles.modalHeader}>
					<h2 className='text text_type_main-large'> {header} </h2>
					<CloseIcon type='primary' onClick={onClose} />
				</div>
				<div>{children}</div>
			</div>
		</>
	);
};

export default Modal;
