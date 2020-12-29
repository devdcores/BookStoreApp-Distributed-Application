import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { isAdmin } from '../service/CommonUtils';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsersAction, deleteUserAction } from '../actions/userActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: userDeleteError } = userDelete;

  useEffect(() => {
    if (userInfo && isAdmin()) {
      dispatch(listUsersAction());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUserAction(userId));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {userDeleteError && <Message variant='danger'>{userDeleteError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USERNAME</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>ROLES</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.roles.map((role) => {
                    if (role.roleName === 'ADMIN_USER') {
                      return (
                        <p style={{ color: 'green' }} className='m-0 p-0'>
                          <strong>{role.roleName}</strong>
                        </p>
                      );
                    }
                    return <p className='m-0 p-0'>{role.roleName}</p>;
                  })}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user.userId}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user.userId)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
