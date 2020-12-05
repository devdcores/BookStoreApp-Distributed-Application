import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [addressExists, setAddressExists] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
      const { data: shippingAddressResponse } = await axios.get('http://localhost:8765/api/billing/shippingAddress', config);
      setAddressExists(true);
      setAddressLine1(shippingAddressResponse.addressLine1);
      setAddressLine2(shippingAddressResponse.addressLine2);
      setCity(shippingAddressResponse.city);
      setCountry(shippingAddressResponse.country);
      setState(shippingAddressResponse.state);
      setPostalCode(shippingAddressResponse.postalCode);
      setPhone(shippingAddressResponse.phone);
    } catch (error) {}
  };

  const saveShippingAddressHandler = async (e) => {
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
      const { data } = await axios.post('http://localhost:8765/api/billing/shippingAddress', shippingAddress, config);
    } catch (error) {
      setError(JSON.stringify(error.message));
      return;
    }

    history.push('/payment');
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

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      {error && <Message variant='danger'>{JSON.stringify(error)}</Message>}
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
          <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control type='number' placeholder='Enter Phone number' value={phone} required onChange={(e) => setPhone(e.target.value)}></Form.Control>
        </Form.Group>

        {addressExists ? (
          <Button type='submit' variant='primary' onClick={updateShippingAddressHandler}>
            Update & Continue
          </Button>
        ) : (
          <Button type='submit' variant='primary' onClick={saveShippingAddressHandler}>
            Save & Continue
          </Button>
        )}
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
