import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAction } from '../actions/productActions';
import useEffectDidMount from '../hooks/useEffectDidMount';
import { useForm } from '../hooks/useForm';

const RatingFilter = () => {


  const dispatch = useDispatch();
  const formEl = useRef();

  const filters = useSelector((state) => state.productList.filters);
  const searchText = useSelector((state) => state.productList.searchText);

  const initialStateForm = {
    maxRating: '5'
  }
  const [form , handleInputChange, resetForm, setForm] = useForm(initialStateForm)
  const {maxRating} = form;

  const [instantRating, setInstantRating] = useState(maxRating);
  const handleChangeInstantRating = (event) => {
    setInstantRating(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();    
    dispatch(listProductsAction(0, searchText, { ...filters, minRating: '0', maxRating}));
  };

  useEffect(() => {
    setForm({
      maxRating: filters.maxRating
    });
    setInstantRating(
      filters.maxRating
    );
  }, [filters])

  useEffectDidMount(()=> {
    formEl.current.click();
  }, [maxRating])

  return (
    <>        
        <form onSubmit={handleSubmit} className="mt-3">
          <h6>Average Rating</h6>
          <div  className='col-container-fully-centered'>
            <input 
                  type="range" 
                  className="custom-range" 
                  id="customRange1" 
                  max='5'
                  min='0'
                  step='0.1'
                  onMouseUp={handleInputChange}
                  current={maxRating}
                  name='maxRating'
                  onChange={handleChangeInstantRating}
              />
              <div>0 - {instantRating}</div>           
              <button type='submit' className="btn btn-primary d-none" ref={formEl}>
                &gt;
              </button>
          </div>
        </form>
    </>
  );
};

export default RatingFilter;
