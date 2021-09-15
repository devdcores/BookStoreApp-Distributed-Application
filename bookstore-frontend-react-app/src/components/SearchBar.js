import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { listProductsAction } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = () => {

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pageResponse, searchText } = productList;
  const [searchTextLocal, setSearchTextLocal] = useState(searchText ? searchText : '');

  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(listProductsAction(0, searchTextLocal));
  };

  return (
    <>
      <Form onSubmit={searchHandler}>
        <div className="bg-light rounded shadow-sm">
          <div className="input-group">
            <input type="search"
                   placeholder="Search books"
                   aria-describedby="button-addon1"
                   className="form-control border-0 bg-light"
                   value={searchTextLocal}
                   onChange={(e) => setSearchTextLocal(e.target.value)}
            />
            <div className="input-group-append">
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-primary"
                disabled={loading}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SearchBar;
