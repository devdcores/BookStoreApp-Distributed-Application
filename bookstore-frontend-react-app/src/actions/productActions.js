import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' });
    const { data } = await axios.get('http://localhost:8765/api/catalog/products');

    dispatch({
      type: 'PRODUCT_LIST_SUCCESS',
      payload: data.page.content
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload: error
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });
    const { data } = await axios.get(`http://localhost:8765/api/catalog/product/${id}`);

    dispatch({
      type: 'PRODUCT_DETAILS_SUCCESS',
      payload: data
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload: error
    });
  }
};
