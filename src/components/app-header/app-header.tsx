import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { NavLink } from 'react-router-dom';
import { RootState } from '@/utils/types';
import { useSelector } from '@/utils/hooks';

export const AppHeader = () => {
	const user = useSelector((state: RootState) => state.auth.user);

	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<NavLink
						to='/'
						end
						className={({ isActive }) =>
							`${styles.link} ${isActive ? styles.link_active : ''}`
						}>
						{({ isActive }) => {
							const iconType = isActive ? 'primary' : 'secondary';
							return (
								<>
									<BurgerIcon type={iconType} />
									<p className='text text_type_main-default ml-2'>
										Конструктор
									</p>
								</>
							);
						}}
					</NavLink>
					<NavLink
						to='/feed'
						className={({ isActive }) =>
							`${styles.link} ml-10 ${isActive ? styles.link_active : ''}`
						}>
						{({ isActive }) => {
							const iconType = isActive ? 'primary' : 'secondary';
							return (
								<>
									<ListIcon type={iconType} />
									<p className='text text_type_main-default ml-2'>
										Лента заказов
									</p>
								</>
							);
						}}
					</NavLink>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<NavLink
					className={({ isActive }) =>
						`${styles.link} ${styles.link_position_last} ${isActive ? styles.link_active : ''}`
					}
					to='/profile'>
					{({ isActive }) => (
						<>
							<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
							<p className='text text_type_main-default ml-2'>
								{user && user.name ? user.name : 'Личный кабинет'}
							</p>
						</>
					)}
				</NavLink>
			</nav>
		</header>
	);
};
