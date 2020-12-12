import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeFromCartAction } from '../actions/cartActions.js';
import { listProductDetailsAction } from '../actions/productActions.js';
import FullPageLoader from './FullPageLoader.js';
import Message from '../components/Message';

const CartItem = ({ item, addToCart }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetailsAction(`${item.productId}`));
  }, [dispatch, item]);

  const removeFromCartHandler = async (cartItemId) => {
    dispatch(removeFromCartAction(cartItemId));
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  return (
    <>
      {error ? (
        <Message variant='danger'> {JSON.stringify(error.message)}</Message>
      ) : (
        <ListGroup.Item key={item.productId}>
          <Row>
            <Col md={2}>
              <Image src={`https://source.unsplash.com/random/500x500?sig=${getRandomNumber()}`} alt={item.productName} fluid rounded></Image>
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
      {loading && <FullPageLoader></FullPageLoader>}
    </>
  );
};

export default CartItem;
