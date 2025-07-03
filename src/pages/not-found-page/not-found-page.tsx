import { Link } from 'react-router-dom';

import logo from './logo.svg';
import styles from './not-found-page.module.css';

const NotFoundPage = () => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.container404}>
				<p className='text text_type_digits-large text_color_inactive'>4</p>
				<img src={logo} alt='Logo' className={styles.logo} />
				<p className='text text_type_digits-large text_color_inactive'>4</p>
			</div>
			<p className='text text_type_main-large text_color_inactive'>
				Упс! Страница не найдена
			</p>
			<br />
			<p className='text text_type_main-default text_color_inactive'>
				Неправильно найден адрес или такой страницы не существует{' '}
			</p>
			<Link to='/' className={styles.link}>
				<p className='text text_type_main-default mt-2'>
					Перейти на главную страницу
				</p>
			</Link>
		</div>
	);
};

export default NotFoundPage;
