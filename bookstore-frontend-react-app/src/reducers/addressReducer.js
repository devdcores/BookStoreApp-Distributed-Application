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
  ADDRESS_DELETE_FAIL,
  ADDRESS_DELETE_RESET
} from '../constants/addressConstants';

export const addressSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_ADD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADDRESS_ADD_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ADDRESS_ADD_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ADDRESS_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const addressListMyReducer = (state = { addresses: [] }, action) => {
  switch (action.type) {
    case ADDRESS_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADDRESS_LIST_MY_SUCCESS:
      return {
        loading: false,
        addresses: action.payload
      };
    case ADDRESS_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ADDRESS_LIST_MY_RESET:
      return { addresses: [] };
    default:
      return state;
  }
};

export const addressDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADDRESS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ADDRESS_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ADDRESS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
