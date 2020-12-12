import { APP_CLIENT_ID, APP_CLIENT_SECRET, BACKEND_API_GATEWAY_URL } from '../constants/appConstants';
import axios from 'axios';
import qs from 'qs';

export const postSignupApi = (singupRequest) => {
  const axiosConfig = getAxiosConfig();
  const responseData = axios.post(`${BACKEND_API_GATEWAY_URL}/api/account/signup`, singupRequest, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

export const postLoginApi = async (loginRequest) => {
  const axiosConfig = {
    headers: {
      'Authorization': 'Basic ' + btoa(APP_CLIENT_ID + ':' + APP_CLIENT_SECRET),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  const loginRequestEncoded = qs.stringify(loginRequest);
  const responseData = await axios.post(`${BACKEND_API_GATEWAY_URL}/api/account/oauth/token`, loginRequestEncoded, axiosConfig).then((response) => {
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

export const putUserInfo = async (accessToken, user) => {
  const axiosConfig = getAxiosConfig(accessToken);
  const responseData = await axios.put(`${BACKEND_API_GATEWAY_URL}/api/account/userInfo`, user, axiosConfig).then((response) => {
    return response.data;
  });
  return responseData;
};

export const getProductDetail = async (productId) => {
  const responseData = axios.get(`${BACKEND_API_GATEWAY_URL}/api/catalog/product/${productId}`).then((response) => {
    return response.data;
  });
  return responseData;
};

export const getAllProductsDetail = async () => {
  const responseData = axios.get(`${BACKEND_API_GATEWAY_URL}/api/catalog/products`).then((response) => {
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
