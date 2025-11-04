import jwtDecode from 'jwt-decode';

export const getErrorMessage = (error) => {
  if (!error) return 'Something went wrong';
  
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (data.error_description) return data.error_description;
    if (data.errors && data.errors.length > 0 && data.errors[0].message) {
      return data.errors[0].message;
    }
  }
  
  return error.message || 'Something went wrong';
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
