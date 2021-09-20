import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAction } from '../actions/productActions';
import { useForm } from '../hooks/useForm';

const PriceFilter = () => {

  const filters = useSelector((state) => state.productList.filters);  
  const searchText = useSelector((state) => state.productList.searchText);

  const initialState = {
    minPrice: '',
    maxPrice: '',
  };
  const [form, handleInputChange, resetForm, setForm] = useForm(initialState);
  const {minPrice, maxPrice} = form;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();    
    dispatch(listProductsAction(0, searchText, {...filters, minPrice, maxPrice}));
  };

  useEffect(() => {
      setForm({
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice
      });
  }, [filters])

  return (
    <>
        <Form onSubmit={handleSubmit} className="mt-3">
          <h6>Price</h6>
          <div className="row-container-fully-centered">
            <Form.Control
              type='number'
              placeholder='min'
              name='minPrice'
              value={minPrice}
              onChange={handleInputChange}
              className='mr-2'
            />
            <Form.Control
              type='number'
              placeholder='max'
              name='maxPrice'
              value={maxPrice}
              onChange={handleInputChange}
              className='mr-2'
            />
            <Button type='submit' variant='primary'>
              &gt;
            </Button>
          </div>
        </Form>
    </>
  );
};

export default PriceFilter;
