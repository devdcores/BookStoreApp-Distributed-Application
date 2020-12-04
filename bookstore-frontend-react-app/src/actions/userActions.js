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
