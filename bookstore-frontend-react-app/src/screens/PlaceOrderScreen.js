import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import CartItem from '../components/CartItem';
import OrderItem from '../components/OrderItem';
// import { createOrder } from '../actions/orderActions';
// import { ORDER_CREATE_RESET } from '../constants/orderConstants';
// import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceOrderScreen = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [previewOrderResponse, setPreviewOrderResponse] = useState(null);
  const [createOrderResponse, setCreateOrderResponse] = useState(null);
  const order = useSelector((state) => state.order);

  if (!order.shippingAddressId) {
    props.history.push('/shipping');
  } else if (!order.billingAddressId) {
    props.history.push('/shipping');
  } else if (!order.paymentMethod) {
    props.history.push('/payment');
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   //   Calculate prices
  //   const addDecimals = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2);
  //   };

  //   cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  //   cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  //   cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  //   cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  //   const orderCreate = useSelector((state) => state.orderCreate);
  //   const { order, success, error } = orderCreate;

  useEffect(() => {
    previewOrder();

    // if (success) {
    //   history.push(`/order/${order._id}`);
    //   //   dispatch({ type: USER_DETAILS_RESET });
    //   //   dispatch({ type: ORDER_CREATE_RESET });
    // }
    // eslint-disable-next-line
  }, []);

  const previewOrder = async () => {
    let config = {
      timeout: 15000,
      headers: {
        'Content-Type': 'Application/Json',
        'Authorization': 'Bearer ' + userInfo.token
      }
    };

    const body = {
      billingAddressId: order.billingAddressId,
      shippingAddressId: order.shippingAddressId,
      paymentMethodId: ''
    };

    try {
      await axios
        .post(`http://localhost:8765/api/order/previewOrder`, body, config)
        .then((res) => {
          console.log('PreviewOrderResponse : ', res);
          setPreviewOrderResponse(res.data);
        })
        .catch((err) => {
          console.error('Detailed Error Trace : ', err);
          setError(err);
        });
    } catch (err) {
      console.error('Detailed Error Trace : ', err);
      setError(err);
    }
  };

  const placeOrder = () => {
    let config = {
      timeout: 15000,
      headers: {
        'Content-Type': 'Application/Json',
        'Authorization': 'Bearer ' + userInfo.token
      }
    };

    const body = {
      billingAddressId: order.billingAddressId,
      shippingAddressId: order.shippingAddressId,
      paymentMethodId: ''
    };

    try {
      return axios.post(`http://localhost:8765/api/order/order`, body, config);
    } catch (err) {
      console.error('Detailed Error Trace : ', err);
      setError(err);
    }
  };

  const placeOrderHandler = async () => {
    // dispatch();
    //   createOrder({
    //     orderItems: cart.cartItems,
    //     shippingAddress: cart.shippingAddress,
    //     paymentMethod: cart.paymentMethod,
    //     itemsPrice: cart.itemsPrice,
    //     shippingPrice: cart.shippingPrice,
    //     taxPrice: cart.taxPrice,
    //     totalPrice: cart.totalPrice
    //   })
    const res = await placeOrder()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error('Detailed Error Trace : ', err);
        setError(JSON.stringify(err));
      });

    setCreateOrderResponse(JSON.stringify(res.data));
    props.history.push(`/order/${res.data.orderId}`);
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      {previewOrderResponse && (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {previewOrderResponse.shippingAddress.addressLine1}, {previewOrderResponse.shippingAddress.city}{' '}
                  {previewOrderResponse.shippingAddress.postalCode}, {previewOrderResponse.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {previewOrderResponse.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {previewOrderResponse.orderItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {previewOrderResponse.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <OrderItem item={item}></OrderItem>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${previewOrderResponse.itemsTotalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${previewOrderResponse.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${previewOrderResponse.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${previewOrderResponse.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>{error && <Message variant='danger'>{error}</Message>}</ListGroup.Item>
                <ListGroup.Item>
                  <Button type='button' className='btn-block' disabled={previewOrderResponse.orderItems === 0} onClick={placeOrderHandler}>
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PlaceOrderScreen;
