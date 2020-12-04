import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = props.location.search ? props.location.search.substring(props.location.search.indexOf('=') + 1) : '/';

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  const registerHandler = (e) => {
    e.preventDefault();
    //Register
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(userName, firstName, email, password));
    }
  };

  return (
    <div>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{JSON.stringify(error)}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={registerHandler}>
          <Form.Group controlId='userName'>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Registor</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
