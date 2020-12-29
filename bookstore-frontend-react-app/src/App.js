import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import { createBrowserHistory } from 'history';
import OrderListScreen from './screens/OrderListScreen';

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/payment' component={PaymentScreen}></Route>
          <Route path='/placeOrder' component={PlaceOrderScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/userProfile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/product/create' component={ProductCreateScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/' component={HomeScreen} exact></Route>
        </Container>
      </main>
      <Footer> </Footer>
    </BrowserRouter>
  );
}

export default App;
