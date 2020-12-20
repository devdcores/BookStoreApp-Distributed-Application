import jwtDecode from 'jwt-decode';

export const getErrorMessage = (error) => {
  return error
    ? error.response
      ? error.response.data
        ? error.response.data.error_description
          ? error.response.data.error_description
          : error.response.data.errors.length > 0
          ? error.response.data.errors[0].message
          : error.message
        : error.message
      : error.message
    : 'Something went wrong';
};

export const isAdmin = () => {
  const userInfoLocalStorage = localStorage.getItem('userInfo');
  if (userInfoLocalStorage) {
    const token = JSON.parse(userInfoLocalStorage).token;
    let decodedToken = jwtDecode(token);
    return decodedToken?.authorities?.includes('ADMIN_USER');
  }
  return false;
};
