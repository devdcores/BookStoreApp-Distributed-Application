import { APP_CLIENT_ID, APP_CLIENT_SECRET, BACKEND_API_GATEWAY_URL } from '../constants/appConstants';
import axios from 'axios';
import qs from 'qs';

export const postSignupApi = (singupRequestBody) => {
  const axiosConfig = getAxiosConfig();
  const responseData = axios.post(`${BACKEND_API_GATEWAY_URL}/api/account/signup`, singupRequestBody, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

export const postLoginApi = async (loginRequestBody) => {
  const axiosConfig = {
    headers: {
      'Authorization': 'Basic ' + btoa(APP_CLIENT_ID + ':' + APP_CLIENT_SECRET),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  const loginRequestBodyEncoded = qs.stringify(loginRequestBody);
  const responseData = await axios.post(`${BACKEND_API_GATEWAY_URL}/api/account/oauth/token`, loginRequestBodyEncoded, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

export const getUserInfoApi = async (accessToken) => {
  const axiosConfig = getAxiosConfig(accessToken);
  const responseData = await axios.get(`${BACKEND_API_GATEWAY_URL}/api/account/userInfo`, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

export const putUserInfoApi = async (accessToken, userInfoRequestBody) => {
  const axiosConfig = getAxiosConfig(accessToken);
  const responseData = await axios.put(`${BACKEND_API_GATEWAY_URL}/api/account/userInfo`, userInfoRequestBody, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

export const getProductDetailApi = async (productId) => {
  const responseData = axios.get(`${BACKEND_API_GATEWAY_URL}/api/catalog/product/${productId}`).then((response) => {
    return response.data;
  });
  return responseData;
};

export const getAllProductsDetailApi = async () => {
  const responseData = axios.get(`${BACKEND_API_GATEWAY_URL}/api/catalog/products`).then((response) => {
    return response.data;
  });
  return responseData;
};

export const addToCartApi = async (accessToken, addToCartRequestBody) => {
  const axiosConfig = getAxiosConfig(accessToken);
  const responseData = axios.post(`${BACKEND_API_GATEWAY_URL}/api/order/cart/cartItem`, addToCartRequestBody, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

export const getCartDetailsApi = async (accessToken) => {
  const axiosConfig = getAxiosConfig(accessToken);
  const cartDetails = await axios.get(`${BACKEND_API_GATEWAY_URL}/api/order/cart`, axiosConfig).then((response) => {
    return response.data;
  });

  let sortedCart = {
    ...cartDetails,
    cartItems: cartDetails.cartItems.sort((a, b) => {
      return a.cartItemId.localeCompare(b.cartItemId);
    })
  };

  return sortedCart;
};

export const removeCartItemApi = async (accessToken, cartItemId) => {
  const axiosConfig = getAxiosConfig(accessToken);
  const responseData = axios.delete(`${BACKEND_API_GATEWAY_URL}/api/order/cart/cartItem/${cartItemId}`, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

export const getAllMyOrdersApi = async (accessToken) => {
  const axiosConfig = getAxiosConfig(accessToken);
  const responseData = axios.get(`${BACKEND_API_GATEWAY_URL}/api/order/order/myorders`, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

const getAxiosConfig = (accessToken) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }
  return axiosConfig;
};
