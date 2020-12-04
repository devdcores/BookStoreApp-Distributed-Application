import axios from 'axios';
import qs from 'qs';

export const login = (usernameOrEmail, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST'
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
      type: 'USER_LOGIN_SUCCESS',
      payload: userInfoResponse
    });

    localStorage.setItem('userInfo', JSON.stringify(userInfoResponse));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: 'USER_LOGOUT'
  });
};

export const register = (userName, firstName, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_REGISTER_REQUEST'
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
      type: 'USER_REGISTER_SUCCESS',
      payload: userInfoResponse
    });

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: userInfoResponse
    });

    localStorage.setItem('userInfo', JSON.stringify(userInfoResponse));
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload: error
    });
  }
};
