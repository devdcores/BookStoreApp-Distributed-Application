import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAction } from '../actions/productActions';

const PriceFilter = () => {

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const dispatch = useDispatch()
  const {searchText} = useSelector((state) => state.productList);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`min price ${minPrice} & max price ${maxPrice}`)
    dispatch(listProductsAction(0, searchText, {minPrice, maxPrice}))
  };

  return (
    <>
        <Form onSubmit={submitHandler}>
          <h6>Price</h6>
          <div className="row-container-fully-centered">
            <Form.Control
              type='number'
              placeholder='min'
              value={minPrice}
              onChange={event => setMinPrice(event.target.value)}
            />
            <Form.Control
              type='number'
              placeholder='max'
              value={maxPrice}
              onChange={event => setMaxPrice(event.target.value)}
            />
            <Button type='submit' variant='primary'>
              >
            </Button>
          </div>
        </Form>
    </>
  );
};

export default PriceFilter;
