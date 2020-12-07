export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_SAVE_BILLING_ADDRESS':
      return {
        ...state,
        billingAddressId: action.payload
      };
    case 'ORDER_SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddressId: action.payload
      };
    case 'ORDER_SAVE_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload
      };
    default:
      return state;
  }
};
