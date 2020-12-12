import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL
} from '../constants/productConstants';
import { getErrorMessage } from '../service/CommonUtils';
import { getAllProductsDetail, getProductDetail } from '../service/RestApiCalls';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    //Get All Products Detail
    const allProductsDetail = await getAllProductsDetail();
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: allProductsDetail.page.content
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const listProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    //Get Product Detail
    const productDetail = await getProductDetail(productId);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: productDetail
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: getErrorMessage(error)
    });
  }
};
