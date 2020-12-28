import React, { useEffect } from 'react';
import { BACKEND_API_GATEWAY_URL } from '../constants/appConstants';
import { useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeFromCartAction } from '../actions/cartActions.js';
import { getProductDetailApi } from '../service/RestApiCalls.js';
import FullPageLoader from './FullPageLoader.js';
import Message from '../components/Message';
import { useState } from 'react';
import { getErrorMessage } from '../service/CommonUtils';

const CartItem = ({ item, addToCart }) => {
  const [product, setProduct] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const productDetail = await getProductDetailApi(item.productId);
      setProduct(productDetail);
      setLoading(false);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, [item]);

  const removeFromCartHandler = async (cartItemId) => {
    dispatch(removeFromCartAction(cartItemId));
  };

  return (
    <>
      {error ? (
        <Message variant='danger'> {JSON.stringify(error.message)}</Message>
      ) : (
        <ListGroup.Item key={item.productId}>
          <Row>
            <Col md={2}>
              <Image src={`${BACKEND_API_GATEWAY_URL}/api/catalog/image/${product?.imageId}`} alt={item.productName} fluid rounded></Image>
            </Col>
            <Col md={3} className='pt-4'>
              <Link to={`/product/${item.productId}`}>{item.productName}</Link>
            </Col>
            <Col md={2} className='pt-4'>
              ${item.itemPrice}
            </Col>
            <Col md={2} className='pt-3'>
              {product && (
                <>
                  <Form.Control as='select' value={item.quantity} onChange={(e) => addToCart(item.productId, e.target.value)}>
                    {product.availableItemCount > 11
                      ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      : [...Array(product.availableItemCount).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                  </Form.Control>
                </>
              )}
            </Col>
            <Col md={1} className='pt-4'>
              ${item.extendedPrice}
            </Col>
            <Col md={2} className='pt-3 pl-5'>
              <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.cartItemId)}>
                <i className='fas fa-trash'></i>
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      )}
      {/* {loading && <FullPageLoader></FullPageLoader>} */}
    </>
  );
};

export default CartItem;
