import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartItem = ({ item, addToCart, getCart }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8765/api/catalog/product/${item.productId}`);
      setProduct(data);
    } catch (err) {
      console.error('Detailed Error Trace : ', err);
      setError(err);
    }
  };

  const removeFromCartHandler = async (cartItemId) => {
    let config = {
      timeout: 15000,
      headers: {
        'Content-Type': 'Application/Json',
        'Authorization': 'Bearer ' + userInfo.token
      }
    };

    try {
      await axios.delete(`http://localhost:8765/api/order/cart/cartItem/${cartItemId}`, config);
      getCart();
    } catch (err) {
      console.error('Detailed Error Trace : ', err);
      setError(err);
    }
  };
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  return (
    <div>
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
    </div>
  );
};

export default CartItem;
