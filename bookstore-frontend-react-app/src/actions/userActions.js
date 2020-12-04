import axios from 'axios';

export const login = (usernameOrEmail, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST'
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data: loginResponse } = await axios.post('http://localhost:8765/api/account/signin', { usernameOrEmail, password }, config);

    config.headers.Authorization = 'Bearer ' + loginResponse.accessToken;

    const { data: userInfoResponse } = await axios.get('http://localhost:8765/api/account/userInfo', config);

    userInfoResponse.token = loginResponse.accessToken;

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

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    //SignUp
    const { data: signUpResponse } = await axios.post('http://localhost:8765/api/account/signup', { userName, firstName, email, password }, config);

    //SignIn
    const { data: loginResponse } = await axios.post('http://localhost:8765/api/account/signin', { usernameOrEmail: userName, password }, config);

    //Get Token
    config.headers.Authorization = 'Bearer ' + loginResponse.accessToken;

    //Get UserInfo
    const { data: userInfoResponse } = await axios.get('http://localhost:8765/api/account/userInfo', config);

    userInfoResponse.token = loginResponse.accessToken;

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
