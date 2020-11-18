import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import { Col, Row } from 'react-bootstrap';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8765/api/catalog/products');
        setProducts(data.page.content);
      } catch (err) {
        setError('Error while retrieving data from backend, ' + err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product key={product.productId} product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
