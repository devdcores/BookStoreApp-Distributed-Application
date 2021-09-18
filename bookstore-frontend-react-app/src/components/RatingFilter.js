import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAction } from '../actions/productActions';
import useEffectDidMount from '../hooks/useEffectDidMount';
import { useForm } from '../hooks/useForm';

const RatingFilter = () => {

  const filters = useSelector((state) => state.productList.filters);
  const searchText = useSelector((state) => state.productList.searchText);

  const [rating, setRating] = useState('')

  const dispatch = useDispatch();

  const handleRatingChange = (e) => {    
    setRating(e.target.value);    
  };

  useEffectDidMount(() => {
    dispatch(listProductsAction(0, searchText, { ...filters, rating}));    
  }, [rating])

  // useEffect(() => {
  //   if (Object.keys(filters).length === 0) {
  //     resetForm();
  //   } else {
  //     setForm(filters);
  //   }
  // }, [filters])

  return (
    <>        
        <h6>Average Rating</h6>
        <div className="row-container-fully-centered">
        <Form.Control 
          as='select' 
          value={rating} 
          onChange={handleRatingChange}
         >
            <option value=''>Select...</option>
            <option value='1'>1 - Poor</option>
            <option value='2'>2 - Fair</option>
            <option value='3'>3 - Good</option>
            <option value='4'>4 - Very Good</option>
            <option value='5'>5 - Excellent</option>
          </Form.Control>

        </div>
    </>
  );
};

export default RatingFilter;
