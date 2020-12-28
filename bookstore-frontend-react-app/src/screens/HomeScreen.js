import Paginate from '../components/Paginate';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import { Col, Row } from 'react-bootstrap';
import { listProductsAction } from '../actions/productActions';
import FullPageLoader from '../components/FullPageLoader';
import ReactPaginate from 'react-paginate';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pageResponse } = productList;

  useEffect(() => {
    dispatch(listProductsAction(0));
  }, [dispatch]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    dispatch(listProductsAction(selected));
  };

  return (
    <>
      <h1>Latest Products</h1>
      {error ? (
        <Message variant='danger'></Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product.productId} sm={12} md={6} lg={4} xl={3}>
                <Product key={product.productId} product={product}></Product>
              </Col>
            ))}
          </Row>
          {/* pageResponse?.pageable?.pageNumber */}
          <Row className='m-5 justify-content-md-center'>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageResponse?.totalPages}
              marginPagesDisplayed={50}
              pageRangeDisplayed={10}
              onPageChange={(e) => handlePageClick(e)}
              containerClassName={'pagination'}
              activeClassName={'page-item active'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-link'}
              nextClassName={'page-link'}
            />
          </Row>
        </>
      )}
      {loading && <FullPageLoader></FullPageLoader>}
    </>
  );
};

export default HomeScreen;
