import {
  ADDRESS_ADD_REQUEST,
  ADDRESS_ADD_SUCCESS,
  ADDRESS_ADD_FAIL,
  ADDRESS_ADD_RESET,
  ADDRESS_LIST_MY_REQUEST,
  ADDRESS_LIST_MY_SUCCESS,
  ADDRESS_LIST_MY_FAIL,
  ADDRESS_LIST_MY_RESET,
  ADDRESS_DELETE_REQUEST,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DELETE_FAIL
} from '../constants/addressConstants';
import { getErrorMessage } from '../service/CommonUtils';
import { getAllAddressesApi, saveAddressApi, deleteAddressApi } from '../service/RestApiCalls';

export const saveAddressAction = (addressRequestBody) => async (dispatch) => {
  try {
    dispatch({
      type: ADDRESS_ADD_REQUEST
    });

    //save address
    await saveAddressApi(addressRequestBody);

    dispatch({
      type: ADDRESS_ADD_SUCCESS
    });
    dispatch(getMyAddresesAction());
  } catch (error) {
    dispatch({
      type: ADDRESS_ADD_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const getMyAddresesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ADDRESS_LIST_MY_REQUEST
    });

    //Get All my addresses
    const myAddressData = await getAllAddressesApi();

    dispatch({
      type: ADDRESS_LIST_MY_SUCCESS,
      payload: myAddressData
    });
  } catch (error) {
    dispatch({
      type: ADDRESS_LIST_MY_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const deleteAddressAction = (addressId) => async (dispatch) => {
  try {
    dispatch({
      type: ADDRESS_DELETE_REQUEST
    });

    //save address
    await deleteAddressApi(addressId);

    dispatch({
      type: ADDRESS_DELETE_SUCCESS
    });
    dispatch(getMyAddresesAction());
  } catch (error) {
    dispatch({
      type: ADDRESS_DELETE_FAIL,
      payload: getErrorMessage(error)
    });
  }
};
