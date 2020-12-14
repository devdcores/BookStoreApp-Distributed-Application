import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Row, ListGroup, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/orderActions';
import { getMyPaymentMethodsAction, savePaymentMethodAction } from '../actions/paymentActions';
import Message from '../components/Message';

const PaymentScreen = ({ history }) => {
  const order = useSelector((state) => state.order);
  const { shippingAddressId } = order;

  if (!shippingAddressId) {
    history.push('/shipping');
  }

  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [expirationMonth, setExpirationMonth] = useState(null);
  const [expirationYear, setExpirationYear] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const paymentMethodSave = useSelector((state) => state.paymentMethodSave);
  const { success, loading: saveLoading, error: saveError } = paymentMethodSave;

  const paymentMethodListMy = useSelector((state) => state.paymentMethodListMy);
  const { paymentMethods, loading: listLoading, error: listError } = paymentMethodListMy;

  useEffect(() => {
    dispatch(getMyPaymentMethodsAction());
  }, [dispatch]);

  const proceedToPlaceOrder = () => {
    history.push('/placeorder');
  };

  const saveCard = () => {
    const cardRequestBody = {
      card: {
        cardNumber: cardNumber,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        cvv: cvv
      }
    };
    dispatch(savePaymentMethodAction(cardRequestBody));
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />

      <Row className='mx-5 justify-content-md-center'>
        <h1 className='mx-5 justify-content-md-center'>Payment Method</h1>
      </Row>
      <hr></hr>
      {(saveError || listError) && <Message variant='danger'>{JSON.stringify(saveError) || JSON.stringify(listError)}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      <Row>
        <Col xs={12} md={6}>
          <h2>Select Payment Method</h2>
          {paymentMethods.map((a) => (
            <>
              <ListGroup.Item variant='flush'>
                <InputGroup>
                  <Col md={1}>
                    <Form.Check
                      type='radio'
                      id={a.paymentMethodId}
                      value={paymentMethodId}
                      name='paymentMethod'
                      checked={a.paymentMethodId === paymentMethodId ? true : false}
                      onChange={(e) => {
                        console.log(a.paymentMethodId);
                        setPaymentMethodId(a.paymentMethodId);
                      }}></Form.Check>
                  </Col>
                  <Col>
                    <div
                      className='p-2'
                      style={{ whiteSpace: 'pre-wrap', backgroundColor: '#eeeeee' }}
                      onClick={(e) => {
                        console.log(a.paymentMethodId);
                        setPaymentMethodId(a.paymentMethodId);
                      }}>
                      <p className='m-0' style={{ textTransform: 'uppercase' }}>
                        {a.cardType}
                      </p>
                      <p className='m-0'>
                        {a.cardLast4Digits} - {a.cardExpirationMonth} / {a.cardExpirationYear}
                      </p>
                    </div>
                  </Col>
                </InputGroup>
              </ListGroup.Item>
            </>
          ))}
        </Col>
        <Col xs={12} md={6}>
          <h2>
            <p>Add New Card</p>
          </h2>
          <Row className='mx-5 justify-content-md-center'>
            <Col>
              <Form>
                <Form.Group controlId='cardNumber'>
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Card Number'
                    value={cardNumber}
                    required
                    onChange={(e) => setCardNumber(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='expirationMonth'>
                  <Form.Label>Expiration Month</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Exp Month'
                    value={expirationMonth}
                    required
                    onChange={(e) => setExpirationMonth(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='expirationYear'>
                  <Form.Label>Expiration Year</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Exp Year'
                    value={expirationYear}
                    required
                    onChange={(e) => setExpirationYear(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='cvv'>
                  <Form.Label>Cvv</Form.Label>
                  <Form.Control type='password' placeholder='Cvv' value={cvv} required onChange={(e) => setCvv(e.target.value)}></Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className='mx-5 justify-content-md-center'>
            <Button type='submit' variant='primary' onClick={saveCard}>
              Add Card
            </Button>
          </Row>
        </Col>
      </Row>

      <hr></hr>
      <Row className='mx-5 justify-content-md-center'>
        <Button type='submit' variant='primary' onClick={proceedToPlaceOrder} className='mt-3' disabled={!paymentMethodId}>
          Continue
        </Button>
      </Row>
    </>
  );
};

export default PaymentScreen;
