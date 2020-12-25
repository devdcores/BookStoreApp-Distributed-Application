import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { isAdmin } from '../service/CommonUtils';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProductsAction, deleteProductAction, createProductAction } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 0;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pageResponse } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !isAdmin()) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProductsAction(pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProductAction(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProductAction());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>IMAGE ID</th>
                <th>AVAILABLE ITEM COUNT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>${product.price}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.imageId}</td>
                  <td>{product.availableItemCount}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product.productId}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product.productId)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {pageResponse && <Paginate pages={pageResponse?.totalPages} page={pageResponse?.pageable?.pageNumber} isAdmin={true} />}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
