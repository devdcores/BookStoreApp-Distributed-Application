import axios from 'axios';
import qs from 'qs';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST
} from '../constants/userConstants';

export const login = (usernameOrEmail, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const clientId = '93ed453e-b7ac-4192-a6d4-c45fae0d99ac';
    const clientSecret = 'client.devd123';

    //TODO Move this to constants
    const config = {
      headers: {
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const params = {
      grant_type: 'password',
      username: usernameOrEmail,
      password: password
    };

    const formEncodedData = qs.stringify(params);

    const { data: loginResponse } = await axios.post('http://localhost:8765/api/account/oauth/token', formEncodedData, config);

    config.headers.Authorization = 'Bearer ' + loginResponse.access_token;

    const { data: userInfoResponse } = await axios.get('http://localhost:8765/api/account/userInfo', config);

    userInfoResponse.token = loginResponse.access_token;

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfoResponse
    });

    localStorage.setItem('userInfo', JSON.stringify(userInfoResponse));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT
  });
};

export const register = (userName, firstName, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const clientId = '93ed453e-b7ac-4192-a6d4-c45fae0d99ac';
    const clientSecret = 'client.devd123';

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    //SignUp
    const { data: signUpResponse } = await axios.post('http://localhost:8765/api/account/signup', { userName, firstName, email, password }, config);

    //SignIn
    //TODO Move this to constants
    const configFormUrlEncoded = {
      headers: {
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const params = {
      grant_type: 'password',
      username: userName,
      password: password
    };

    const formEncodedData = qs.stringify(params);

    const { data: loginResponse } = await axios.post('http://localhost:8765/api/account/oauth/token', formEncodedData, configFormUrlEncoded);

    //Get Token
    config.headers.Authorization = 'Bearer ' + loginResponse.access_token;

    //Get UserInfo
    const { data: userInfoResponse } = await axios.get('http://localhost:8765/api/account/userInfo', config);

    userInfoResponse.token = loginResponse.access_token;

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: userInfoResponse
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfoResponse
    });

    localStorage.setItem('userInfo', JSON.stringify(userInfoResponse));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    //Get UserInfo
    const { data: userInfoResponse } = await axios.get('http://localhost:8765/api/account/userInfo', config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: userInfoResponse
    });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`http://localhost:8765/api/account/userInfo`, user, config);

    const updatedUserInfo = {
      ...userInfo,
      ...user
    };

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: updatedUserInfo
    });
    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: data
    // });

    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message
    });
  }
};
