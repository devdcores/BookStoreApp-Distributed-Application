import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import OrderItem from '../components/OrderItem';
import { previewOrderAction, placeOrderAction } from '../actions/orderActions';
// import { ORDER_CREATE_RESET } from '../constants/orderConstants';
// import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceOrderScreen = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const order = useSelector((state) => state.order);

  const orderPreview = useSelector((state) => state.orderPreview);
  const { loading: previewOrderLoading, order: previewOrderResponse } = orderPreview;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading: placeOrderLoading, order: createOrderResponse } = orderCreate;

  if (!order.shippingAddressId) {
    props.history.push('/shipping');
  } else if (!order.billingAddressId) {
    props.history.push('/shipping');
  } else if (!order.paymentMethod) {
    props.history.push('/payment');
  }

  useEffect(() => {
    previewOrder();
    // if (success) {
    //   history.push(`/order/${order._id}`);
    //   //   dispatch({ type: USER_DETAILS_RESET });
    //   //   dispatch({ type: ORDER_CREATE_RESET });
    // }
    // eslint-disable-next-line
    if (createOrderResponse?.orderId != null) {
      props.history.push(`/order/${createOrderResponse.orderId}`);
    }
  }, [dispatch, createOrderResponse, order]);

  const previewOrder = () => {
    const previewOrderRequestBody = {
      billingAddressId: order.billingAddressId,
      shippingAddressId: order.shippingAddressId,
      paymentMethodId: order.paymentMethod
    };
    dispatch(previewOrderAction(previewOrderRequestBody));
  };

  const placeOrderHandler = () => {
    const placeOrderRequestBody = {
      billingAddressId: order.billingAddressId,
      shippingAddressId: order.shippingAddressId,
      paymentMethodId: order.paymentMethod
    };

    dispatch(placeOrderAction(placeOrderRequestBody));
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      {previewOrderLoading === false && (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {previewOrderResponse.shippingAddress.addressLine1}, {previewOrderResponse.shippingAddress.city}
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
