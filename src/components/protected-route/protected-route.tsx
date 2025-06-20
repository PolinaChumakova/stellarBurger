import { RootState } from '@/utils/types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ onlyUnAuth = false, component }) => {
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);

	const location = useLocation();

	// url == /profile, onlyUnAuth = false, user == null
	// url == /login, from: /profile, onlyUnAuth = true, user == null
	// url == /login, from: /profile, onlyUnAuth = true, user != null
	// url == /profile, onlyUnAuth = false, user != null
	// url == /profile, onlyUnAuth = false, user == null

	if (!isAuthenticated) {
		return <p>Loading...</p>;
	}

	if (!onlyUnAuth && !user) {
		// For authorized, but unauthorized
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		// For unauthorized, but authorized
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	// !onlyUnAuth && user for authorized and authorized
	// onlyUnAuth && !user for unauthorized and unauthorized

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
	<Protected onlyUnAuth={true} component={component} />
);
