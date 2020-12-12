import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import { Col, Row } from 'react-bootstrap';
import { listProductsAction } from '../actions/productActions';
import FullPageLoader from '../components/FullPageLoader';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProductsAction());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {error ? (
        <Message variant='danger'></Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.productId} sm={12} md={6} lg={4} xl={3}>
              <Product key={product.productId} product={product}></Product>
            </Col>
          ))}
        </Row>
      )}
      {loading && <FullPageLoader></FullPageLoader>}
    </>
  );
};

export default HomeScreen;
