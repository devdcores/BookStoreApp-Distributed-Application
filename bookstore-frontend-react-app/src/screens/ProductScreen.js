import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductScreen = (props) => {
  const productId = props.match.params.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:8765/api/catalog/product/' + productId);
        setProduct(response.data);
      } catch (err) {
        alert('Error' + err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {product ? <p>{product.productName}</p> : null}{' '}
    </>
  );
};

export default ProductScreen;
