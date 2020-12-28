import React, { useEffect, useState } from 'react';
import { BACKEND_API_GATEWAY_URL } from '../constants/appConstants';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProductDetailsAction, updateProductAction } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { uploadImageApi } from '../service/RestApiCalls';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
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
      setImage(imageId);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    dispatch(
      updateProductAction({
        productId,
        productName,
        price,
        imageId: image,
        description,
        availableItemCount
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <h1>Edit Product</h1>
      <hr></hr>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Row>
                <Form.Group controlId='image'>
                  <img
                    src={`${BACKEND_API_GATEWAY_URL}/api/catalog/image/${image}`}
                    alt={image}
                    style={{ height: '400px' }}
                    fluid
                    rounded
                  ></img>

                  {uploading && <Loader />}
                </Form.Group>
                <Form.File className='mr-4' id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
              </Row>
            </Col>
            <Col>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
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

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className='m-5 justify-content-md-center'>
            <Button type='submit' variant='primary' onClick={submitHandler}>
              Update
            </Button>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductEditScreen;
