import {
  PAYMENT_METHOD_ADD_REQUEST,
  PAYMENT_METHOD_ADD_SUCCESS,
  PAYMENT_METHOD_ADD_FAIL,
  PAYMENT_METHOD_ADD_RESET,
  PAYMENT_METHOD_LIST_MY_REQUEST,
  PAYMENT_METHOD_LIST_MY_SUCCESS,
  PAYMENT_METHOD_LIST_MY_FAIL,
  PAYMENT_METHOD_LIST_MY_RESET
} from '../constants/paymentConstants';

export const paymentMethodSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_METHOD_ADD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PAYMENT_METHOD_ADD_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case PAYMENT_METHOD_ADD_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case PAYMENT_METHOD_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const paymentMethodListMyReducer = (state = { paymentMethods: [] }, action) => {
  switch (action.type) {
    case PAYMENT_METHOD_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PAYMENT_METHOD_LIST_MY_SUCCESS:
      return {
        loading: false,
        paymentMethods: action.payload
      };
    case PAYMENT_METHOD_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case PAYMENT_METHOD_LIST_MY_RESET:
      return { paymentMethods: [] };
    default:
      return state;
  }
};
