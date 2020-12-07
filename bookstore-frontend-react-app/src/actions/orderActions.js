export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_SHIPPING_ADDRESS',
    payload: data
  });
};

export const saveBillingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_BILLING_ADDRESS',
    payload: data
  });
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: 'ORDER_SAVE_PAYMENT_METHOD',
    payload: data
  });
};
