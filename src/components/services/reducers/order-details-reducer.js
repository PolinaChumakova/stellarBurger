import {
	GET_ORDER_DETAILS_FAILED,
	GET_ORDER_DETAILS_REQUEST,
	GET_ORDER_DETAILS_SUCCESS,
} from '../actions';

const initialState = {
	orderDetailsRequest: false,
	orderDetailsFailed: false,
	orderDetails: null,
};

export const orderDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ORDER_DETAILS_REQUEST: {
			return {
				...state,
				orderDetailsRequest: true,
				orderDetailsFailed: false,
			};
		}
		case GET_ORDER_DETAILS_SUCCESS: {
			return {
				...state,
				orderDetails: action.orderDetails,
				orderDetailsRequest: false,
			};
		}
		case GET_ORDER_DETAILS_FAILED: {
			return {
				...state,
				orderDetailsFailed: true,
				orderDetailsRequest: false,
			};
		}
		default: {
			return state;
		}
	}
};
