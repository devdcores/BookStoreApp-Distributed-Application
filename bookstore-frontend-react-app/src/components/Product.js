import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { getImageApi } from '../service/RestApiCalls';

const Product = (props) => {
  const product = props.product;
  const [productimageBase64, setProductimageBase64] = useState('');

  useEffect(async () => {
    if (product?.imageId) {
      setProductimageBase64(await getImageApi(product?.imageId));
    }
  }, []);

  return (
    <>
      <Card className='my-3 rounded'>
        <Link to={`/product/${product.productId}`}>
          <Card.Img
            src={`data:image/png;base64, ${productimageBase64}`}
            variant='top'
            style={{ minWidth: '100%', height: '200px' }}
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
