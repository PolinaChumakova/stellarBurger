import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	onClose: () => void;
};

const ModalOverlay = ({ onClose }: TModalOverlayProps) => {
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape' || event.key === 'Esc') {
			onClose();
		}
	};

	return (
		<div
			className={styles.modalOverlay}
			onClick={onClose}
			onKeyDown={handleKeyDown}
			role='button'
			tabIndex={0}></div>
	);
};

export default ModalOverlay;
