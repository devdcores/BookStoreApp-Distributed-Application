import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartItem = ({ item, addToCart, getCart }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  let config = {
    timeout: 15000,
    headers: {
      'Content-Type': 'Application/Json',
      'Authorization':
        'Bearer ' +
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX25hbWUiOiI0YWRkZGEzMC1jNzVlLTQ5YzQtYTk5Yi04ZmQzZTAzYzk3NzAiLCJhdXRob3JpdGllcyI6WyJTVEFOREFSRF9VU0VSIl0sImF1ZCI6WyJ3ZWIiXSwiZXhwIjoxNjA3MDE1NjU5LCJpYXQiOjE2MDcwMTI2NjB9.I0If-OvK112_qpY9drUpmcM4Y6hZXtJYRrdun1oVtQtXMfPGGnN-cI9u57KLRv1V5OMLqqh_-rvdFfrrQG0s0Ge_cCp3yFFNrOillCJk751ZBXF7h_VzOpMfMFeRqZEOFPcwO6edomzrZjZ6EKkMTlHsjycgnXefY3Idoa_9XKnw-I1uLITkLDkbxOYf9DWW0QQ-CKH_FYdFTe9lF85yQqOcIBIQ2LXkUrMAbyykGQ_5h09bdA79TQhbh3FQZMHq40jv440rb4Z0jSwa6rRmNUmEDUf9FZxEXqX5PLS7etFGyasfib9wqCaQIgU8gF81e61X22G5Od-YTYZ3HdSoXw',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Credentials': true
    }
  };

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
          <Col md={3}>
            <Link to={`/product/${item.productId}`}>{item.productName}</Link>
          </Col>
          <Col md={2}>${item.price}</Col>
          <Col md={2}>
            {product && (
              <>
                <Form.Control as='select' value={item.quantity} onChange={(e) => addToCart(item.productId, e.target.value)}>
                  {product.availableItemCount < 0
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
          <Col md={2}>
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
