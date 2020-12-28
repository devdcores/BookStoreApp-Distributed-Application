import React, { useEffect } from 'react';
import { BACKEND_API_GATEWAY_URL } from '../constants/appConstants';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from './Message';
import { getProductDetailApi } from '../service/RestApiCalls.js';
import { useState } from 'react';
import { getErrorMessage } from '../service/CommonUtils';
import Loader from './Loader';

const OrderItem = ({ item }) => {
  const [product, setProduct] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      const productDetail = await getProductDetailApi(item.productId);
      setProduct(productDetail);
      setLoading(false);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, [item]);

  return (
    <>
      {error && <Message variant='danger'> {JSON.stringify(error.message)}</Message>}
      {loading ? (
        <Loader></Loader>
      ) : (
        <ListGroup.Item key={item.productId}>
          <Row>
            <Col md={2}>
              <Image src={`${BACKEND_API_GATEWAY_URL}/api/catalog/image/${product?.imageId}`} alt={item.productName} fluid rounded></Image>
            </Col>
            <Col md={3} className='pt-4'>
              <Link to={`/product/${item.productId}`}>{product.productName}</Link>
            </Col>
            <Col md={2} className='pt-4'>
              ${item.orderItemPrice}
            </Col>
            <Col md={2} className='pt-4'>
              {item.quantity}
            </Col>
            <Col md={1} className='pt-4'>
              ${item.orderExtendedPrice}
            </Col>
          </Row>
        </ListGroup.Item>
      )}
    </>
  );
};

export default OrderItem;
