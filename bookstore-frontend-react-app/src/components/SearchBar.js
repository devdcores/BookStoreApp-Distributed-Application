import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { listProductsAction } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';

const SearchBar = () => {

  const initialState = {
    searchText:''
  };
  const [form, handleInputChange] = useForm(initialState);
  const {searchText} = form;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(listProductsAction(0, searchText, {}));
  };
  
  return (
    <div className="w-100">
      <Form onSubmit={handleSubmit}>
        <div className="bg-light rounded shadow-sm">
          <div className="input-group">
            <input type="search"
                   placeholder="Search books"
                   aria-describedby="button-addon1"
                   className="form-control border-0 bg-light"
                   name="searchText"
                   value={searchText}
                   onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-primary"                
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default React.memo(SearchBar);
