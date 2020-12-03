import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const product = props.product;
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  return (
    <>
      <Card className='my-3 rounded'>
        <Link to={`/product/${product.productId}`}>
          <Card.Img src={`https://source.unsplash.com/random/500x500?sig=${getRandomNumber()}`} variant='top'></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/product/${product.productId}`}>
            <Card.Title as='div'>
              <strong>{product.productName}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            <Rating value={product.averageRating} text={`${product.noOfRatings} reviews`}></Rating>
          </Card.Text>

          <Card.Text as='div' className='my-3'>
            <p>${product.price}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
