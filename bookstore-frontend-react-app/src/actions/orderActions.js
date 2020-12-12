import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST
} from '../constants/orderConstants';
import { getErrorMessage } from '../service/CommonUtils';
import { getAllMyOrdersApi } from '../service/RestApiCalls';

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_SHIPPING_ADDRESS',
    payload: data
  });
};

export const saveBillingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_BILLING_ADDRESS',
    payload: data
  });
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_PAYMENT_METHOD',
    payload: data
  });
};

export const listMyOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    });

    const myOrdersData = await getAllMyOrdersApi(getState().userLogin.userInfo.token);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: myOrdersData
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: getErrorMessage(error)
    });
  }
};
