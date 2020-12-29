import {
  ORDER_PREVIEW_REQUEST,
  ORDER_PREVIEW_SUCCESS,
  ORDER_PREVIEW_FAIL,
  ORDER_PREVIEW_RESET,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST
} from '../constants/orderConstants';

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_SAVE_BILLING_ADDRESS':
      return {
        ...state,
        billingAddressId: action.payload
      };
    case 'ORDER_SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddressId: action.payload
      };
    case 'ORDER_SAVE_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethodId: action.payload
      };
    default:
      return state;
  }
};

export const orderListAllReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderPreviewReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_PREVIEW_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ORDER_PREVIEW_SUCCESS:
      return {
        loading: false,
        order: action.payload
      };
    case ORDER_PREVIEW_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_PREVIEW_RESET:
      return { order: {} };
    default:
      return state;
  }
};

export const orderCreateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_CREATE_RESET:
      return { order: {} };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {}, loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
