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
