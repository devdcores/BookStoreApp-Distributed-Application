import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProductDetailsAction, updateProductAction } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { uploadImageApi } from "../service/RestApiCalls";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [imageId, setImageId] = useState('');
  const [availableItemCount, setAvailableItemCount] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product?.productName || product?.productId !== productId) {
        dispatch(listProductDetailsAction(productId));
      } else {
        setProductName(product.productName);
        setPrice(product.price);
        setImage(product.imageId);
        setAvailableItemCount(product.availableItemCount);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('imageFile', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { imageId } = await uploadImageApi(config, formData);
      setImageId(imageId);
      setImage(e.target.files[0]?.name);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAction({
        productId,
        productName,
        price,
        imageId,
        description,
        availableItemCount
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name' placeholder='Enter name' value={productName}
                            onChange={(e) => setProductName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.files[0].name)}
              ></Form.Control>
              <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
              <p>ImageId : {imageId}</p>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={availableItemCount}
                onChange={(e) => setAvailableItemCount(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/*<Form.Group controlId='category'>*/}
            {/*  <Form.Label>Category</Form.Label>*/}
            {/*  <Form.Control*/}
            {/*    type='text'*/}
            {/*    placeholder='Enter category'*/}
            {/*    value={productCategory}*/}
            {/*    onChange={(e) => setCategory(e.target.value)}*/}
            {/*  ></Form.Control>*/}
            {/*</Form.Group>*/}

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
