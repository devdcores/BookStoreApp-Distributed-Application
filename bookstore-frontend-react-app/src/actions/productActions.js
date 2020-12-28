import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_REVIEWS_FAIL,
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
  PRODUCT_TOP_FAIL,
  PRODUCT_IMAGE_REQUEST,
  PRODUCT_IMAGE_SUCCESS,
  PRODUCT_IMAGE_FAIL
} from '../constants/productConstants';
import { getErrorMessage } from '../service/CommonUtils';
import {
  getAllProductsDetailApi,
  getProductDetailApi,
  getProductReviewsApi,
  createProductReviewApi,
  updateProductDetailApi,
  createProductApi,
  deleteProductApi,
  getImageApi
} from '../service/RestApiCalls';

export const listProductsAction = (pageNumber) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    //Get All Products Detail
    const allProductsDetail = await getAllProductsDetailApi(pageNumber || 0);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: allProductsDetail.page.content,
      pageResponse: allProductsDetail.page
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const listProductDetailsAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    //Get Product Detail
    const productDetail = await getProductDetailApi(productId);
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

export const listProductReviewsAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEWS_REQUEST });
    //Get Product Reviews
    const productReviews = await getProductReviewsApi(productId);

    dispatch({
      type: PRODUCT_REVIEWS_SUCCESS,
      payload: productReviews
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEWS_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const getImageAction = (imageId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_IMAGE_REQUEST });
    //Get Product Reviews
    const base64Image = await getImageApi(imageId);

    dispatch({
      type: PRODUCT_IMAGE_SUCCESS,
      payload: base64Image
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_IMAGE_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const createProductReviewAction = (createProductReviewRequestBody) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST
    });

    //Create Product Review
    await createProductReviewApi(createProductReviewRequestBody);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS
    });
    dispatch(listProductDetailsAction(createProductReviewRequestBody.productId));
    dispatch(listProductReviewsAction(createProductReviewRequestBody.productId));
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const deleteProductAction = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    });

    //Delete Product
    await deleteProductApi(productId);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS
    });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message
    });
  }
};

export const createProductAction = (productReqBody) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    });

    //Create Product
    await createProductApi(productReqBody);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS
    });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message
    });
  }
};

export const updateProductAction = (productReqBody) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    });

    //Update Product
    await updateProductDetailApi(productReqBody);

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS
    });
    dispatch(listProductDetailsAction(productReqBody.productId));
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message
    });
  }
};
