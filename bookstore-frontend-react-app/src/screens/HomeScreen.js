import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Message from '../components/Message';
import { Col, Row, Container } from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('🔥 Fetching products...');
        
        const response = await axios.get('/api/catalog/products', {
          params: {
            page: 0,
            size: 8
          }
        });
        
        console.log('📦 Full Response:', response);
        console.log('📦 Response Data:', response.data);
        console.log('📦 Response Page:', response.data?.page);
        console.log('📦 Response Content:', response.data?.page?.content);
        
        if (response.data && response.data.page && response.data.page.content) {
          const productsData = response.data.page.content;
          console.log('✅ Setting products:', productsData);
          setProducts(productsData);
          console.log('✅ Loaded', productsData.length, 'products');
        } else {
          console.log('❌ No products found in response structure');
        }
        setLoading(false);
        console.log('✅ Loading finished');
      } catch (err) {
        console.error('❌ Error:', err);
        console.error('❌ Error message:', err.message);
        console.error('❌ Error response:', err.response);
        console.error('❌ Error config:', err.config);
        setError(err.message || 'Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container className='py-5'>
      <div className='text-center mb-5'>
        <h1 className='display-4 fw-bold' style={{color: '#ff5722'}}>Latest Fashion Collection</h1>
        <p className='lead text-muted'>Discover our curated selection of premium clothing and accessories</p>
      </div>
      
      {console.log('🎨 Rendering - Loading:', loading, 'Error:', error, 'Products:', products)}
      
      {loading ? (
        <div className='text-center py-5'>
          <div className='spinner-border text-primary'>
            <span className='sr-only'>Loading...</span>
          </div>
          {console.log('🔄 Showing loading spinner')}
        </div>
      ) : error ? (
        <>
          {console.log('❌ Showing error:', error)}
          <Message variant='danger'>{error}</Message>
        </>
      ) : (
        <Row>
          {console.log('🎯 Rendering products. Count:', products?.length)}
          {products && products.length > 0 ? (
            products.map((product) => {
              console.log('🛍️ Rendering product:', product.productId, product.productName);
              return (
                <Col key={product.productId} sm={12} md={6} lg={4} xl={3} className='mb-4'>
                  <Product product={product} />
                </Col>
              );
            })
          ) : (
            <Col className='text-center'>
              {console.log('ℹ️ No products to show')}
              <Message variant='info'>No products</Message>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default HomeScreen;
