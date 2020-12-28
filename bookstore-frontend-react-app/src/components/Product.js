import React from 'react';
import { BACKEND_API_GATEWAY_URL } from '../constants/appConstants';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const product = props.product;
  return (
    <>
      <Card className='my-3 rounded' style={{ height: '400px' }}>
        <Link to={`/product/${product.productId}`}>
          <Card.Img
            src={`${BACKEND_API_GATEWAY_URL}/api/catalog/image/${product?.imageId}`}
            variant='top'
            style={{ height: '250px' }}
          ></Card.Img>
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
