import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetailsAction } from '../actions/orderActions';
// import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
// import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const [successPay, setSuccessPay] = useState(false);
  const [successDeliver, setSuccessDeliver] = useState(false);
  const [loadingDeliver, setLoadingDeliver] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  // const [order, setOrder] = useState(null);
  //   const orderDetails = useSelector((state) => state.orderDetails);
  //   const { order, loading, error } = orderDetails;

  //   const orderPay = useSelector((state) => state.orderPay);
  //   const { loading: loadingPay, success: successPay } = orderPay;

  //   const orderDeliver = useSelector((state) => state.orderDeliver);
  //   const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetail = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetail;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const clientId = 'AXA9AYfXDI_VAwGQRKLpju3NqxBvD-z7LhOAmNgdSTGL3cQbH1EsA47zyzPcpjDmXNlxER2rHFWBF9Qa';
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order?.orderId || successPay || successDeliver) {
      //   dispatch({ type: ORDER_PAY_RESET });
      //   dispatch({ type: ORDER_DELIVER_RESET });
      //   dispatch(getOrderDetails(orderId));
      // getOrderDetails(orderId)
      //   .then((res) => {
      //     setOrder(res.data);
      //     console.log('OrderDetails ', res.data);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      dispatch(getOrderDetailsAction(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, loading]);

  const successPaymentHandler = (paymentResult) => {
    console.log('PAYMENT SUCCESS', paymentResult);
    // dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    // dispatch(deliverOrder(order));
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1>Order - {order.orderId}</h1>
          <hr></hr>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {userInfo.userName}
                  </p>
                  <p>
                    <strong>Email: </strong> <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.addressLine1}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  {order.delivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              {/* <Image src={item.image} alt={item.name} fluid rounded /> */}
                              <Image src={`https://source.unsplash.com/random/500x500?sig=${getRandomNumber()}`} alt={item.productName} fluid rounded></Image>
                            </Col>
                            <Col>
                              <Link to={`/product/${item.productId}`}>{item.productId}</Link>
                            </Col>
                            <Col md={4}>
                              {item.quantity} x ${item.orderItemPrice} = ${item.quantity * item.orderItemPrice}
                            </Col>
                          </Row>
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
                      <Col>${order.itemsTotalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                    </ListGroup.Item>
                  )}
                  {loadingDeliver && <Loader />}
                  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
