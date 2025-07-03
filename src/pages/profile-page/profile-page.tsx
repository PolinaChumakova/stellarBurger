import { useDispatch } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';

import styles from './profile-page.module.css';
import { logoutUser } from '../../components/services/actions/auth';

const ProfilePage = () => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(logoutUser());
	};

	return (
		<div className={styles.pageContainer}>
			<nav className={styles.navContainer}>
				<NavLink
					to=''
					end
					className={({ isActive }) =>
						isActive ? styles.link_active : styles.link
					}>
					<h2 className='text text_type_main-medium mt-4 mb-4'>Профиль</h2>
				</NavLink>
				<NavLink
					to='orders'
					className={({ isActive }) =>
						isActive ? styles.link_active : styles.link
					}>
					<h2 className='text text_type_main-medium mt-4 mb-4'>
						История заказов
					</h2>
				</NavLink>
				<Link to='logout' className={styles.link} onClick={handleClick}>
					<h2 className='text text_type_main-medium mt-4 mb-4'>Выход</h2>
				</Link>
				<div>
					<p className='text text_type_main-default text_color_inactive mt-20'>
						В этом разделе вы можете <br /> изменить свои персональные данные
					</p>
				</div>
			</nav>
			<div className={styles.inputContainer}>
				<Outlet />
			</div>
		</div>
	);
};

export default ProfilePage;
