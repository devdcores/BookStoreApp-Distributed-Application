import React, { useEffect, useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAction } from '../actions/productActions';
import useEffectDidMount from '../hooks/useEffectDidMount';
import { useForm } from '../hooks/useForm';

const StockFilter = () => {

  const dispatch = useDispatch();
  const formEl = useRef();

  const filters = useSelector((state) => state.productList.filters);
  const searchText = useSelector((state) => state.productList.searchText);

  const initialStateForm = {
    availability: ''
  }
  const [form , handleInputChange, resetForm, setForm, handleCheckedChange] = useForm(initialStateForm)
  const {availability} = form;

  const handleSubmit = (e) => {
    e.preventDefault();    
    dispatch(listProductsAction(0, searchText, { ...filters, availability}));
  };

  useEffect(() => {
    setForm({
      availability: filters.availability
    });
  }, [filters])

  useEffectDidMount(()=> {
    formEl.current.click();
  }, [availability])

  return (
    <>
      <Form className="mt-1" onSubmit={handleSubmit}>
        <h6>Availability</h6>
        <Form.Check
          type="switch"
          id="availability"
          name='availability'
          onChange={handleCheckedChange}
          checked={availability}
        />
        <button type='submit' className="btn btn-primary d-none" ref={formEl}>
          &gt;
        </button>
      </Form>
    </>
  );
};

export default StockFilter;
