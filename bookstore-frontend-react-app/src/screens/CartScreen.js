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

  let config = {
    timeout: 15000,
    headers: {
      'Content-Type': 'Application/Json',
      'Authorization':
        'Bearer ' +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX25hbWUiOiI0YWRkZGEzMC1jNzVlLTQ5YzQtYTk5Yi04ZmQzZTAzYzk3NzAiLCJhdXRob3JpdGllcyI6WyJTVEFOREFSRF9VU0VSIl0sImF1ZCI6WyJ3ZWIiXSwiZXhwIjoxNjA3MDE1NjU5LCJpYXQiOjE2MDcwMTI2NjB9.I0If-OvK112_qpY9drUpmcM4Y6hZXtJYRrdun1oVtQtXMfPGGnN-cI9u57KLRv1V5OMLqqh_-rvdFfrrQG0s0Ge_cCp3yFFNrOillCJk751ZBXF7h_VzOpMfMFeRqZEOFPcwO6edomzrZjZ6EKkMTlHsjycgnXefY3Idoa_9XKnw-I1uLITkLDkbxOYf9DWW0QQ-CKH_FYdFTe9lF85yQqOcIBIQ2LXkUrMAbyykGQ_5h09bdA79TQhbh3FQZMHq40jv440rb4Z0jSwa6rRmNUmEDUf9FZxEXqX5PLS7etFGyasfib9wqCaQIgU8gF81e61X22G5Od-YTYZ3HdSoXw',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Credentials': true
    }
  };

  useEffect(() => {
    if (productId) {
      async function postData() {
        await addToCart(productId, qty);
      }
      postData();
    }

    getCart();
  }, [productId, qty]);

  const addToCart = async (pId, q) => {
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
      <Row>
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
                      <Button type='button' className='btn-block' disabled={cart?.cartItems?.length === 0} onClick='checkoutHandler'>
                        Proceed To Checkout
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Row>
    </>
  );
};

export default CartScreen;
