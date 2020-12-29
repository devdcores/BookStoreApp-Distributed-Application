import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUserAction } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { getAllRolesApi } from '../service/RestApiCalls';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  const [checkedItems, setCheckedItems] = useState(new Map());

  useEffect(async () => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.userName || user.userId !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        user.roles.forEach((role) => {
          checkedItems.set(role.roleName, true);
          setCheckedItems(new Map(checkedItems));
        });
      }
    }
    await getAllRolesApi().then((roles) => {
      setRoles(roles);
    });
  }, [dispatch, history, userId, user, successUpdate]);

  const handleChange = (event) => {
    checkedItems.set(event.target.name, event.target.checked);
    setCheckedItems(new Map(checkedItems));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let roles = Array.from(checkedItems)
      .filter((item) => item[1] === true)
      .map((i) => {
        return i[0];
      });

    dispatch(
      updateUserAction(userId, {
        firstName,
        lastName,
        email,
        roles
      })
    );
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            {roles.length > 0 &&
              roles.map((role) => (
                <div key={role.roleName}>
                  <Form.Check
                    key={role.roleName}
                    inline
                    label={`ROLE : ${role.roleName}`}
                    type='checkbox'
                    id={role.roleName}
                    checked={!!checkedItems.get(`${role.roleName}`)}
                    name={role.roleName}
                    onChange={handleChange}
                  />
                </div>
              ))}

            <Button className='mt-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
