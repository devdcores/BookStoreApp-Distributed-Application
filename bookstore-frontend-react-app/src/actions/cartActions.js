import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_RESET,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_RESET,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL
} from '../constants/cartConstants';
import { getErrorMessage } from '../service/CommonUtils';
import { addToCartApi, getCartDetailsApi, removeCartItemApi } from '../service/RestApiCalls';

export const addToCartAction = (addToCartRequestBody) => async (dispatch) => {
  try {
    dispatch({
      type: CART_ADD_ITEM_REQUEST
    });
    //Add to cart Api
    await addToCartApi(addToCartRequestBody);

    dispatch({
      type: CART_ADD_ITEM_SUCCESS
    });

    //Get Cart Details
    dispatch(getCartDetailsAction());
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const getCartDetailsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: CART_DETAILS_REQUEST
    });
    //Get cart details Api
    const cartResponse = await getCartDetailsApi();
    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: cartResponse
    });
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const removeFromCartAction = (cartItemId) => async (dispatch) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM_REQUEST
    });
    //Add to cart Api
    await removeCartItemApi(cartItemId);

    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS
    });

    //Get Cart Details
    dispatch(getCartDetailsAction());
  } catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
