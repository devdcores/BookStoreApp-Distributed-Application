import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer, productReviewsReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderListMyReducer, orderReducer, orderPreviewReducer, orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
import { cartAddReducer, cartDetailReducer, cartRemoveReducer } from './reducers/cartReducers';
import { addressDeleteReducer, addressListMyReducer, addressSaveReducer } from './reducers/addressReducer';
import { paymentMethodListMyReducer, paymentMethodSaveReducer } from './reducers/paymentReducers';

const appReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviews: productReviewsReducer,
  cart: cartDetailReducer,
  cartAdd: cartAddReducer,
  cartRemove: cartRemoveReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  order: orderReducer,
  orderListMy: orderListMyReducer,
  orderPreview: orderPreviewReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  addressSave: addressSaveReducer,
  addressListMy: addressListMyReducer,
  addressDelete: addressDeleteReducer,
  paymentMethodSave: paymentMethodSaveReducer,
  paymentMethodListMy: paymentMethodListMyReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const billingAddressId = localStorage.getItem('billingAddressId') ? localStorage.getItem('billingAddressId') : null;
const shippingAddressId = localStorage.getItem('shippingAddressId') ? localStorage.getItem('shippingAddressId') : null;
const paymentMethodId = localStorage.getItem('paymentMethodId') ? localStorage.getItem('paymentMethodId') : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  order: {
    billingAddressId,
    shippingAddressId,
    paymentMethodId
  }
};

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    console.log('Logout Root Reducer');
    state = undefined;
  }
  return appReducer(state, action);
};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
