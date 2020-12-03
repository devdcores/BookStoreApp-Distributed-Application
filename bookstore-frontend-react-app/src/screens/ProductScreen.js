import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(props.match.params.id));
  }, [dispatch]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'></Message>
      ) : product ? (
        <Row>
          <Col md={6}>
            <Image src='https://source.unsplash.com/random?book' alt={product.prductName} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h4>{product.productName}</h4>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.averageRating} text={`${product.noOfRatings} reviews`}></Rating>
              </ListGroupItem>
              <ListGroupItem>Price : ${product.price}</ListGroupItem>
              <ListGroupItem>Description : {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.availableItemCount > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroupItem>

                {product.availableItemCount > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {product.availableItemCount > 10
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
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroupItem>
                  <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.availableItemCount <= 0}>
                    {' '}
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : null}

      {/* Show Product */}
      {}
    </>
  );
};

export default ProductScreen;
