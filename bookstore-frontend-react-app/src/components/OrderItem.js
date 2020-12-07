import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderItem = ({ item }) => {
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    getProductDetail(item.productId);
  }, []);

  const getProductDetail = async (id) => {
    const { data } = await axios.get(`http://localhost:8765/api/catalog/product/${id}`);
    setProductDetail(data);
  };
  return (
    <div>
      {productDetail && (
        <ListGroup.Item key={item.productId}>
          <Row>
            <Col md={2}>
              <Image src={`https://source.unsplash.com/random/500x500?books`} alt={item.productName} fluid rounded></Image>
            </Col>
            <Col md={3} className='pt-4'>
              <Link to={`/product/${item.productId}`}>{productDetail.productName}</Link>
            </Col>
            <Col md={2} className='pt-4'>
              ${item.orderItemPrice}
            </Col>
            <Col md={2} className='pt-4'>
              {item.quantity}
            </Col>
            <Col md={1} className='pt-4'>
              ${item.orderExtendedPrice}
            </Col>
          </Row>
        </ListGroup.Item>
      )}
    </div>
  );
};

export default OrderItem;
