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

import { getErrorMessage } from '../service/CommonUtils';
import { getAllPaymentMethodsApi, savePaymentMethodApi } from '../service/RestApiCalls';

export const savePaymentMethodAction = (cardRequestBody) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_ADD_REQUEST
    });

    //save payment
    await savePaymentMethodApi(cardRequestBody);

    dispatch({
      type: PAYMENT_METHOD_ADD_SUCCESS
    });
    dispatch(getMyPaymentMethodsAction());
  } catch (error) {
    dispatch({
      type: PAYMENT_METHOD_ADD_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const getMyPaymentMethodsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_LIST_MY_REQUEST
    });

    //Get All my payment methods
    const paymentMethodsList = await getAllPaymentMethodsApi();

    dispatch({
      type: PAYMENT_METHOD_LIST_MY_SUCCESS,
      payload: paymentMethodsList
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_METHOD_LIST_MY_FAIL,
      payload: getErrorMessage(error)
    });
  }
};
