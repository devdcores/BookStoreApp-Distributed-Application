import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import CartItem from '../components/CartItem';
// import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = (props) => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const redirect = props.location.pathname + props.location.search;

  useEffect(() => {
    if (userInfo === null || userInfo === undefined) {
      props.history.push(`/login?redirect=${redirect}`);
      return;
    }
    if (productId) {
      async function postData() {
        await addToCart(productId, qty);
      }
      postData();
    }

    getCart();
  }, [productId, qty, userInfo]);

  const addToCart = async (pId, q) => {
    let config = {
      timeout: 15000,
      headers: {
        'Content-Type': 'Application/Json',
        'Authorization': 'Bearer ' + userInfo.token,
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Credentials': true
      }
    };

    const body = {
      productId: pId || productId,
      quantity: q || qty
    };

    try {
      await axios.post(`http://localhost:8765/api/order/cart/cartItem`, body, config).catch((err) => {
        console.error('Detailed Error Trace : ', err);
        setError(err);
      });
    } catch (err) {
      console.error('Detailed Error Trace : ', err);
      setError(err);
    }

    getCart();
  };

  const getCart = async () => {
    let config = {
      timeout: 15000,
      headers: {
        'Content-Type': 'Application/Json',
        'Authorization': 'Bearer ' + userInfo.token,
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Credentials': true
      }
    };

    try {
      const cartDetails = await axios.get(`http://localhost:8765/api/order/cart`, config);

      let sortedCart = {
        ...cartDetails.data,
        cartItems: cartDetails.data.cartItems.sort((a, b) => {
          return a.cartItemId.localeCompare(b.cartItemId);
        })
      };
      setCart(sortedCart);
    } catch (err) {
      console.error('Detailed Error Trace : ', err);
      setError(err);
    }
  };

  const checkoutHandler = () => {
    console.log('Checkout');
  };
  return (
    <>
      <>
        {error ? (
          <Message variant='danger'> {JSON.stringify(error.message)}</Message>
        ) : (
          <>
            <Row>
              <h1>Shopping Cart</h1>
            </Row>
            <Row>
              <Col md={8}>
                {cart == null || cart?.cartItems?.length == 0 ? (
                  <Message>
                    Your cart is empty <Link to='/'>Go Back</Link>
                  </Message>
                ) : (
                  <ListGroup.Item variant='flush'>
                    {cart?.cartItems?.map((item) => (
                      <CartItem item={item} addToCart={addToCart} getCart={getCart}></CartItem>
                    ))}
                  </ListGroup.Item>
                )}
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>Subtotal ({cart?.cartItems?.length}) Items</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h3>${cart?.totalPrice}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button type='button' className='btn-block' disabled={cart?.cartItems?.length === 0} onClick={checkoutHandler}>
                        Proceed To Checkout
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </>
    </>
  );
};

export default CartScreen;
