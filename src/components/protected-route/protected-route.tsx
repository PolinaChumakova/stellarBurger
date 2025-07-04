import { RootState } from '@/utils/types';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface IProtectedProps {
	onlyUnAuth?: boolean;
	component: ReactNode;
}

const Protected: FC<IProtectedProps> = ({ onlyUnAuth = false, component }) => {
	const { isAuthChecked, user } = useSelector((state: RootState) => state.auth);

	const location = useLocation();

	if (!isAuthChecked) {
		return <p>Loading...</p>;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: FC<IProtectedProps> = ({ component }) => (
	<Protected onlyUnAuth={true} component={component} />
);
