import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderListMyReducer, orderReducer, orderPreviewReducer, orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
import { cartAddReducer, cartDetailReducer, cartRemoveReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
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
  orderDetails: orderDetailsReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const billingAddressId = localStorage.getItem('billingAddressId') ? localStorage.getItem('billingAddressId') : null;
const shippingAddressId = localStorage.getItem('shippingAddressId') ? localStorage.getItem('shippingAddressId') : null;
const paymentMethod = localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  order: {
    billingAddressId,
    shippingAddressId,
    paymentMethod
  }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
