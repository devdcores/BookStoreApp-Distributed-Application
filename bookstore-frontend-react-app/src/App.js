import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
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

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/payment' component={PaymentScreen}></Route>
          <Route path='/placeOrder' component={PlaceOrderScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/' component={HomeScreen} exact></Route>
        </Container>
      </main>
      <Footer> </Footer>
    </BrowserRouter>
  );
}

export default App;
