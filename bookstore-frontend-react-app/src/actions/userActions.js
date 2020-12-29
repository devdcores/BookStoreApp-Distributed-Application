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

import {
  getUserInfoApi,
  postLoginApi,
  postSignupApi,
  putUserInfoApi,
  deleteUserApi,
  getAllUsersApi,
  getUserApi,
  updateUserApi
} from '../service/RestApiCalls';
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

    const userInfo = {
      token: loginResponse.access_token
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    //Get UserInfo
    const userInfoResponse = await getUserInfoApi();
    userInfoResponse.token = loginResponse.access_token;
    userInfoResponse.refresh_token = loginResponse.refresh_token;

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
  localStorage.clear();
  console.log('LOGOUT ACTION!!!');
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

    const userInfo = {
      token: loginResponse.access_token
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    //Get UserInfo
    const userInfoResponse = await getUserInfoApi();
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

export const getUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    let userInfoResponse;
    if (userId) {
      userInfoResponse = await getUserApi(userId);
    } else {
      //Get UserInfo
      userInfoResponse = await getUserInfoApi();
    }

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

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });

    //Update userInfo
    await putUserInfoApi(user);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const updatedUserInfo = {
      ...userInfo,
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

export const listUsersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    });

    //list  users
    const listUsersResponse = await getAllUsersApi();

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: listUsersResponse
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    });

    //Delete User
    await deleteUserApi(userId);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: getErrorMessage(error)
    });
  }
};

export const updateUserAction = (userId, userUpdateRequestBody) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    });

    //Update User
    await updateUserApi(userId, userUpdateRequestBody);

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch(getUserDetails(userId));
    dispatch(listUsersAction());
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message
    });
  }
};
