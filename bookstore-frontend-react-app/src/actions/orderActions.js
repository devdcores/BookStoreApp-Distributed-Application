import {
  ORDER_PREVIEW_REQUEST,
  ORDER_PREVIEW_SUCCESS,
  ORDER_PREVIEW_FAIL,
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
import { getAllMyOrdersApi, previewOrderApi, placeOrderApi, getOrderApi, getAllOrdersApi } from '../service/RestApiCalls';

export const saveBillingAddressIdToLocalStorage = (billingAddressId) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_SHIPPING_ADDRESS',
    payload: billingAddressId
  });
  localStorage.setItem('billingAddressId', billingAddressId);
};

export const saveShippingAddressIdToLocalStorage = (shippingAddressId) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_BILLING_ADDRESS',
    payload: shippingAddressId
  });
  localStorage.setItem('shippingAddressId', shippingAddressId);
};

export const savePaymentMethodIdToLocalStorage = (paymentMethodId) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_PAYMENT_METHOD',
    payload: paymentMethodId
  });
  localStorage.setItem('paymentMethodId', paymentMethodId);
};

export const listOrdersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST
    });

    //Get All my Orders
    const ordersData = await getAllOrdersApi();

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: ordersData
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const listMyOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    });

    //Get All my Orders
    const myOrdersData = await getAllMyOrdersApi();

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

export const previewOrderAction = (previewOrderRequestBody) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PREVIEW_REQUEST
    });

    //Preview Order
    const previewOrderData = await previewOrderApi(previewOrderRequestBody);

    dispatch({
      type: ORDER_PREVIEW_SUCCESS,
      payload: previewOrderData
    });
  } catch (error) {
    dispatch({
      type: ORDER_PREVIEW_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const placeOrderAction = (placeOrderRequestBody) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    });

    //Place Order
    const placeOrderData = await placeOrderApi(placeOrderRequestBody);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: placeOrderData
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const getOrderDetailsAction = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });

    //Get Order by Id
    const getOrderData = await getOrderApi(orderId);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: getOrderData
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: getErrorMessage(error)
    });
  }
};
