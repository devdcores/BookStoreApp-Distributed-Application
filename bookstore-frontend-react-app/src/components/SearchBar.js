import React from 'react';

const SearchBar = () => {
  return (
    <div className="bg-light rounded shadow-sm">
      <div className="input-group">
        <input type="search"
               placeholder="Search books"
               aria-describedby="button-addon1"
               className="form-control border-0 bg-light"
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
  );
};

export default SearchBar;
