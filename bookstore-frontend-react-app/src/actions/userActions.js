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

import { getUserInfoApi, postLoginApi, postSignupApi, putUserInfo } from '../service/RestApiCalls';
import { getErrorMessage } from '../service/CommonUtils';

export const login = (usernameOrEmail, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const loginRequest = {
      grant_type: 'password',
      username: usernameOrEmail,
      password: password
    };

    //Login
    const loginResponse = await postLoginApi(loginRequest);
    //Get UserInfo
    const userInfoResponse = await getUserInfoApi(loginResponse.access_token);
    userInfoResponse.token = loginResponse.access_token;

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfoResponse
    });

    localStorage.setItem('userInfo', JSON.stringify(userInfoResponse));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: getErrorMessage(error)
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

    //SignUp
    const signUpRequest = {
      grant_type: 'password',
      userName,
      password,
      firstName,
      email
    };

    //SignUp
    await postSignupApi(signUpRequest);

    //Login
    const loginRequest = {
      grant_type: 'password',
      username: userName,
      password: password
    };
    const loginResponse = await postLoginApi(loginRequest);

    //Get UserInfo
    const userInfoResponse = await getUserInfoApi(loginResponse.access_token);
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
      payload: getErrorMessage(error)
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    //Get UserInfo
    const userInfoResponse = await getUserInfoApi(getState().userLogin.userInfo.token);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: userInfoResponse
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });

    //Update userInfo
    await putUserInfo(getState().userLogin.userInfo.token, user);

    const updatedUserInfo = {
      ...getState().userLogin.userInfo,
      ...user
    };

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: updatedUserInfo
    });

    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: getErrorMessage(error)
    });
  }
};
