import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, ListGroup, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch } from 'react-redux';
import { saveShippingAddress, saveBillingAddress } from '../actions/orderActions';

const ShippingScreen = ({ history }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [billingAddressId, setBillingAddressId] = useState('');
  const [shippingAddressId, setShippingAddressId] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    getShippingAddress();
  }, []);

  const getShippingAddress = async () => {
    let config = {
      timeout: 15000,
      headers: {
        'Content-Type': 'Application/Json',
        'Authorization': 'Bearer ' + userInfo.token
      }
    };

    try {
      const { data: addresses } = await axios.get('http://localhost:8765/api/billing/address', config);
      setAddresses(addresses);
      if (addresses.length > 0) {
        setBillingAddressId(addresses[0].addressId);
        setShippingAddressId(addresses[0].addressId);
      }
    } catch (error) {}
  };

  const saveAddressHandler = async (e) => {
    e.preventDefault();

    let config = {
      timeout: 15000,
      headers: {
        'Content-Type': 'Application/Json',
        'Authorization': 'Bearer ' + userInfo.token
      }
    };

    try {
      const shippingAddress = { addressLine1, addressLine2, city, state, postalCode, country, phone };
      const { data } = await axios.post('http://localhost:8765/api/billing/address', shippingAddress, config);
      getShippingAddress();
      setError(null);
      setShowForm(false);
    } catch (error) {
      setError(JSON.stringify(error.message));
      return;
    }
  };

  const updateShippingAddressHandler = async (e) => {
    e.preventDefault();

    let config = {
      timeout: 15000,
      headers: {
        'Content-Type': 'Application/Json',
        'Authorization': 'Bearer ' + userInfo.token
      }
    };

    try {
      const shippingAddress = { addressLine1, addressLine2, city, state, postalCode, country, phone };
      const { data } = await axios.put('http://localhost:8765/api/billing/shippingAddress', shippingAddress, config);
    } catch (error) {
      setError(JSON.stringify(error.message));
      return;
    }

    history.push('/payment');
  };

  const proceedToPayment = () => {
    if (shippingAddressId === null || shippingAddressId === '') {
      setError('Shipping Address is required');
      return;
    }
    dispatch(saveShippingAddress(shippingAddressId));
    dispatch(saveBillingAddress(billingAddressId));
    history.push('/payment');
  };

  return (
    <>
      <Row className='justify-content-md-center'>
        <CheckoutSteps step1 step2 />
      </Row>
      {error && <Message variant='danger'>{JSON.stringify(error)}</Message>}
      <Row>
        <Col xs={12} md={6}>
          <h2>Select Billing Address</h2>
          {addresses.map((a) => (
            <>
              <ListGroup.Item variant='flush'>
                <InputGroup>
                  <Col md={1}>
                    <Form.Check
                      type='radio'
                      id={a.billingAddressId}
                      value={billingAddressId}
                      name='billingAddress'
                      checked={a.addressId === billingAddressId ? true : false}></Form.Check>
                  </Col>
                  <Col>
                    <div
                      className='p-2'
                      style={{ whiteSpace: 'pre-wrap', backgroundColor: '#eeeeee' }}
                      onClick={(e) => {
                        console.log(a.addressId);
                        setBillingAddressId(a.addressId);
                      }}>
                      <p className='m-0'>{a.addressLine1} </p>
                      <p className='m-0'>{a.addressLine2}</p>
                      <p className='m-0'>{a.city}</p>
                      <p className='m-0'>{a.state}</p>
                      <p className='m-0'>{a.country}</p>
                      <p className='m-0'>{a.postalCode}</p>
                      <p className='m-0'>{a.phone}</p>
                    </div>
                  </Col>
                </InputGroup>
              </ListGroup.Item>
            </>
          ))}
        </Col>
        <Col xs={12} md={6}>
          <h2>Select Shipping Address</h2>
          {addresses.map((a) => (
            <>
              <ListGroup.Item variant='flush'>
                <InputGroup>
                  <Col md={1}>
                    <Form.Check
                      type='radio'
                      id={a.billingAddressId}
                      value={shippingAddressId}
                      name='shippingAddress'
                      checked={a.addressId === shippingAddressId ? true : false}></Form.Check>
                  </Col>
                  <Col>
                    <div
                      className='p-2'
                      style={{ whiteSpace: 'pre-wrap', backgroundColor: '#eeeeee' }}
                      onClick={(e) => {
                        console.log(a.addressId);
                        setShippingAddressId(a.addressId);
                      }}>
                      <p className='m-0'>{a.addressLine1} </p>
                      <p className='m-0'>{a.addressLine2}</p>
                      <p className='m-0'>{a.city}</p>
                      <p className='m-0'>{a.state}</p>
                      <p className='m-0'>{a.country}</p>
                      <p className='m-0'>{a.postalCode}</p>
                      <p className='m-0'>{a.phone}</p>
                    </div>
                  </Col>
                </InputGroup>
              </ListGroup.Item>
            </>
          ))}
        </Col>
      </Row>
      <Row className='m-3 justify-content-md-center'>
        <Button
          onClick={() => {
            setShowForm(true);
          }}>
          Add New Address
        </Button>
      </Row>
      {error && <Message variant='danger'>{JSON.stringify(error)}</Message>}
      {showForm && (
        <>
          <Row className='mx-5 justify-content-md-center'>
            <Col>
              <Form>
                <Form.Group controlId='addressLine1'>
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter address line 1'
                    value={addressLine1}
                    required
                    onChange={(e) => setAddressLine1(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='addressLine2'>
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter address line 2'
                    value={addressLine2}
                    required
                    onChange={(e) => setAddressLine2(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='text' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='state'>
                  <Form.Label>State</Form.Label>
                  <Form.Control type='text' placeholder='Enter State' value={state} required onChange={(e) => setState(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type='text' placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type='number' placeholder='Enter Phone number' value={phone} required onChange={(e) => setPhone(e.target.value)}></Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className='mx-5 justify-content-md-center'>
            <Button type='submit' variant='primary' onClick={saveAddressHandler}>
              Save Address
            </Button>
          </Row>
        </>
      )}
      <Row className='mx-5 justify-content-md-center'>
        <Button type='submit' variant='primary' onClick={proceedToPayment} className='mt-3'>
          Continue
        </Button>
      </Row>
    </>
  );
};

export default ShippingScreen;
